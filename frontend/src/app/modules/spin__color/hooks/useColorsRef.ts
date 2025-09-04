import  { useRef, useEffect } from "react";
import { GenerateColors } from "../index";

export default function useColorsRef() {
    const color_1 = useRef<HTMLSpanElement | null>(null);
    const color_2 = useRef<HTMLSpanElement | null>(null);
    const color_3 = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        setInterval(() => {
            GenerateColors(color_1, color_2, color_3);
        }, 30000);
    }, []);

    return { color_1, color_2, color_3 };

}