import { NextResponse } from "next/server";

export async function GET() {
  let leetcodeData = null;
  let githubData = null;

  /* =========================================================
     1. LEETCODE LIVE DATA
  ========================================================= */

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
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
        variables: {
          username: "Shoouryya1",
        },
      }),
      next: {
        revalidate: 1800,
      },
    });

    if (res.ok) {
      const json = await res.json();
      const user = json?.data?.matchedUser;

      if (user) {
        /* -----------------------------
           Solved Problems
        ----------------------------- */

        const stats = user.submitStats?.acSubmissionNum || [];

        const totalSolved =
          stats.find((s) => s.difficulty === "All")?.count ?? 0;

        const easy = stats.find((s) => s.difficulty === "Easy")?.count ?? 0;

        const medium = stats.find((s) => s.difficulty === "Medium")?.count ?? 0;

        const hard = stats.find((s) => s.difficulty === "Hard")?.count ?? 0;

        /* -----------------------------
           Ranking
        ----------------------------- */

        const ranking = user.profile?.ranking ?? null;

        /* -----------------------------
           Submission Calendar
        ----------------------------- */

        const calendarStr = user.userCalendar?.submissionCalendar || "{}";

        let rawCalendar = {};

        try {
          rawCalendar = JSON.parse(calendarStr);
        } catch {
          rawCalendar = {};
        }

        const dateMap = {};

        Object.entries(rawCalendar).forEach(([timestamp, count]) => {
          const date = new Date(Number(timestamp) * 1000);

          const dateStr = date.toISOString().split("T")[0];

          dateMap[dateStr] = Number(count) || 0;
        });

        /* -----------------------------
           Current Streak
        ----------------------------- */

        let currentStreak = 0;

        const checkDate = new Date();

        let dateStr = checkDate.toISOString().split("T")[0];

        // If no submission today, start checking from yesterday.
        if (!dateMap[dateStr]) {
          checkDate.setDate(checkDate.getDate() - 1);
        }

        while (true) {
          dateStr = checkDate.toISOString().split("T")[0];

          if ((dateMap[dateStr] || 0) > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        /* -----------------------------
           Past 6 Months Activity
           182 days ≈ 6 months
        ----------------------------- */

        const past6Months = [];

        const now = new Date();

        for (let i = 181; i >= 0; i--) {
          const date = new Date(now);

          date.setDate(date.getDate() - i);

          const activityDate = date.toISOString().split("T")[0];

          const count = dateMap[activityDate] || 0;

          let level = 0;

          if (count >= 9) {
            level = 4;
          } else if (count >= 5) {
            level = 3;
          } else if (count >= 2) {
            level = 2;
          } else if (count >= 1) {
            level = 1;
          }

          past6Months.push({
            date: activityDate,
            count,
            level,
          });
        }

        /* -----------------------------
           Final LeetCode Object
        ----------------------------- */

        leetcodeData = {
          handle: user.username || "Shoouryya1",

          rank: ranking ? `#${ranking.toLocaleString()}` : null,

          totalSolved,
          easy,
          medium,
          hard,

          currentStreak,

          totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,

          past6Months,
        };
      }
    }
  } catch (error) {
    console.error("LeetCode live API fetch error:", error);
  }

  /* =========================================================
     2. GITHUB LIVE DATA
  ========================================================= */

  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/shouryaonnet?y=last",
      {
        next: {
          revalidate: 1800,
        },
      },
    );

    if (res.ok) {
      const json = await res.json();

      const contributions = json?.contributions || [];

      /* -----------------------------
         Last 150 Days
      ----------------------------- */

      const last150 = contributions.slice(-150);

      const totalIn150 = last150.reduce(
        (total, contribution) => total + (contribution.count || 0),
        0,
      );

      /* -----------------------------
         Current GitHub Streak
      ----------------------------- */

      let currentStreak = 0;

      for (let i = last150.length - 1; i >= 0; i--) {
        const count = last150[i]?.count || 0;

        if (count > 0) {
          currentStreak++;
        } else if (i === last150.length - 1) {
          // Allow today to have no activity yet.
          continue;
        } else {
          break;
        }
      }

      /* -----------------------------
         Final GitHub Object
      ----------------------------- */

      githubData = {
        handle: "shouryaonnet",
        totalIn150,
        currentStreak,
        past150Days: last150,
      };
    }
  } catch (error) {
    console.error("GitHub live API fetch error:", error);
  }

  /* =========================================================
     RESPONSE
  ========================================================= */

  return NextResponse.json({
    leetcode: leetcodeData || {
      handle: "Shoouryya1",
      rank: null,

      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,

      currentStreak: 0,
      totalActiveDays: 0,

      past6Months: [],
    },

    github: githubData || {
      handle: "shouryaonnet",

      totalIn150: 0,
      currentStreak: 0,

      past150Days: [],
    },
  });
}
