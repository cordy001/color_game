import { RefObject } from "react";

type SpanRef = RefObject<HTMLSpanElement | null>;

export default function GenerateColors(
    color_1: SpanRef, 
    color_2: SpanRef, 
    color_3: SpanRef
) {

    const color__set = [ 
        { color: "#ff0000", key: "red" },
        { color: "#00ff00", key: "green" },
        { color: "#0000ff", key: "blue" },
        { color: "#ffff00", key: "yellow" },
        { color: "#ff00ff", key: "pink" },
        { color: "#ffffff", key: "white" },
    ];

    const rand = () => color__set[Math.floor(Math.random() * color__set.length)].color;

    if (color_1.current) color_1.current.style.backgroundColor = rand();

    if (color_2.current) color_2.current.style.backgroundColor = rand();

    if (color_3.current) color_3.current.style.backgroundColor = rand();

}


