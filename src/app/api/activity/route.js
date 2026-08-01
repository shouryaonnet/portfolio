import { NextResponse } from "next/server";

export async function GET() {
  let leetcodeData = null;
  let githubData = null;

  // 1. Fetch LeetCode live data via GraphQL
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              userCalendar {
                streak
                totalActiveDays
                submissionCalendar
              }
            }
          }
        `,
        variables: { username: "Shoouryya1" },
      }),
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const json = await res.json();
      const user = json?.data?.matchedUser;
      if (user) {
        const stats = user.submitStats?.acSubmissionNum || [];
        const totalSolved = stats.find((s) => s.difficulty === "All")?.count || 502;
        const easy = stats.find((s) => s.difficulty === "Easy")?.count || 199;
        const medium = stats.find((s) => s.difficulty === "Medium")?.count || 271;
        const hard = stats.find((s) => s.difficulty === "Hard")?.count || 32;

        const rank = user.profile?.ranking || 12450;
        const calendarStr = user.userCalendar?.submissionCalendar || "{}";
        const rawCalendar = JSON.parse(calendarStr);

        const dateMap = {};
        Object.keys(rawCalendar).forEach((ts) => {
          const dateStr = new Date(parseInt(ts) * 1000).toISOString().split("T")[0];
          dateMap[dateStr] = rawCalendar[ts];
        });

        // Calculate exact streak up to today or yesterday
        let streak = 0;
        let checkDate = new Date();
        let todayStr = checkDate.toISOString().split("T")[0];
        if (!dateMap[todayStr]) {
          checkDate.setDate(checkDate.getDate() - 1);
        }

        while (true) {
          const dStr = checkDate.toISOString().split("T")[0];
          if (dateMap[dStr] > 0) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        // Build past 90 days grid
        const past90Days = [];
        const now = new Date();
        for (let i = 89; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          const count = dateMap[dateStr] || 0;
          past90Days.push({
            date: dateStr,
            count,
            level: count > 8 ? 4 : count > 4 ? 3 : count > 0 ? 2 : 0,
          });
        }

        leetcodeData = {
          handle: "Shoouryya1",
          rank: rank ? `#${rank.toLocaleString()}` : "#12,450",
          totalSolved,
          easy,
          medium,
          hard,
          currentStreak: streak || user.userCalendar?.streak || 67,
          totalActiveDays: user.userCalendar?.totalActiveDays || 119,
          past90Days,
        };
      }
    }
  } catch (err) {
    console.error("LeetCode live API fetch error:", err);
  }

  // 2. Fetch GitHub live data (5 months / ~150 days)
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/shouryaonnet?y=last",
      { next: { revalidate: 1800 } }
    );

    if (res.ok) {
      const json = await res.json();
      const contributions = json?.contributions || [];

      // Slice last 150 days (5 months)
      const last150 = contributions.slice(-150);
      const totalIn150 = last150.reduce((acc, c) => acc + (c.count || 0), 0);

      let currentStreak = 0;
      for (let i = last150.length - 1; i >= 0; i--) {
        if (last150[i].count > 0) {
          currentStreak++;
        } else if (i === last150.length - 1) {
          continue;
        } else {
          break;
        }
      }

      githubData = {
        handle: "shouryaonnet",
        totalIn150: totalIn150 || 64,
        currentStreak: currentStreak || 14,
        past150Days: last150,
      };
    }
  } catch (err) {
    console.error("GitHub live API fetch error:", err);
  }

  return NextResponse.json({
    leetcode: leetcodeData || {
      handle: "Shoouryya1",
      rank: "#12,450",
      totalSolved: 502,
      easy: 199,
      medium: 271,
      hard: 32,
      currentStreak: 67,
      totalActiveDays: 119,
    },
    github: githubData || {
      handle: "shouryaonnet",
      totalIn150: 64,
      currentStreak: 14,
    },
  });
}
