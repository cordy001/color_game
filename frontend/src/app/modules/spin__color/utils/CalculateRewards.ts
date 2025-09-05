export default async function CalculateRewards(
    result: string[],
    chosenColors: string[],
) {
    const pointsPerMatch = 20;
    const extraPointsPerDuplicate = 10;

    let totalPoints = 0;

    // Count matches and extra points
    const colorCount: Record<string, number> = {};

    for (const color of result) {
        if (chosenColors.includes(color)) {
            // Base points
            totalPoints += pointsPerMatch;

            // Count occurrences
            colorCount[color] = (colorCount[color] || 0) + 1;

            // Add extra points for duplicates (only for 2nd, 3rd, etc.)
            if (colorCount[color] > 1) {
                totalPoints += extraPointsPerDuplicate;
            }
        }
    }

    return totalPoints;
}
