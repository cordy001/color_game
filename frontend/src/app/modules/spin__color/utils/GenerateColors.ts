import { RefObject } from "react";

type SpanRef = RefObject<HTMLSpanElement | null>;

export default function GenerateColors(
    color_1: SpanRef, 
    color_2: SpanRef, 
    color_3: SpanRef,
    setShowStatus: (value: boolean) => void
): Promise<[string, string, string]> {

    const color__set = [ 
        { color: "#ff0000", key: "red" },
        { color: "#00ff00", key: "green" },
        { color: "#0000ff", key: "blue" },
        { color: "#ffff00", key: "yellow" },
        { color: "#ff00ff", key: "pink" },
        { color: "#ffffff", key: "white" },
    ];

    setShowStatus(true);

    return new Promise((resolve) => {
        setTimeout(() => {
            const rand = () => color__set[Math.floor(Math.random() * color__set.length)];

            const colorObj1 = rand();
            const colorObj2 = rand();
            const colorObj3 = rand();

            if (color_1.current) color_1.current.style.backgroundColor = colorObj1.color;
            if (color_2.current) color_2.current.style.backgroundColor = colorObj2.color;
            if (color_3.current) color_3.current.style.backgroundColor = colorObj3.color;

            setShowStatus(false);

            resolve([colorObj1.key, colorObj2.key, colorObj3.key]);
        }, 5000);
    });
}
