const choosen__Colors: string[] = [];

export default function ChoosinColors(
    setChosenColors: (colors: string[]) => void,
    ...choosenColors: string[]
) {

     // If the first argument is "CLEAR", reset everything
    if (choosenColors.length === 1 && choosenColors[0] === "CLEAR") {
        choosen__Colors.length = 0;
        return setChosenColors([]);
    }

    
    // Add new colors and remove duplicates
    choosen__Colors.push(...choosenColors);

    // Keep only unique values
    const uniqueColors = Array.from(new Set(choosen__Colors));
    choosen__Colors.length = 0;
    choosen__Colors.push(...uniqueColors);

    return setChosenColors(uniqueColors);
}
