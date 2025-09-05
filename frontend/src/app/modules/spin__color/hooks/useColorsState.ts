import { useState } from "react";

export default function useColorsState() {
    const [showStatus, setShowStatus] = useState(false);
    const [chosenColors, setChosenColors] = useState<string[]>([]); 
    const [points, setPoints] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

    return {
        showStatus,
        setShowStatus,
        chosenColors,
        setChosenColors,
        points,
        setPoints,
        cost,
        setCost
    };
}