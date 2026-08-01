function generateHeatmap(days, activityChance) {
  return Array.from({ length: days }, () => {
    if (Math.random() > activityChance) return 0; // no activity
    return Math.ceil(Math.random() * 4); // intensity level 1-4
  });
}

export const leetcodeActivity = {
  currentStreak: 128,
  longestStreak: 150,
  cells: generateHeatmap(168, 0.75), // ~24 weeks
};

export const githubActivity = {
  currentStreak: 42,
  longestStreak: 89,
  cells: generateHeatmap(168, 0.7),
};