export default async function CalculateRewards(
    result: string[],
    chosenColors: string[],
) {
    const pointsPerMatch = 20;

    // Count how many colors in result match chosenColors
    const matches = result.filter(color => chosenColors.includes(color)).length;

    // Total points earned this spin
    const totalPoints = matches * pointsPerMatch;

    return totalPoints;
}
