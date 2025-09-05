import  { useRef } from "react";

export default function useColorsRef() {

    const color_1 = useRef<HTMLSpanElement | null>(null);
    const color_2 = useRef<HTMLSpanElement | null>(null);
    const color_3 = useRef<HTMLSpanElement | null>(null);

    return { color_1, color_2, color_3 };

}