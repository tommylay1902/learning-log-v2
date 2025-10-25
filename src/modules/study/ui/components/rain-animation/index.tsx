"use client";
import React, { useEffect, useState } from "react";
import RainDrop from "./rain-drop";

interface RainContainerProps {
    start: boolean;
}

const RainContainer: React.FC<RainContainerProps> = ({ start }) => {
    const [drops, setDrops] = useState<
        Array<{ id: number; initialX: number; delay: number }>
    >([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (start) {
            const numDrops = 50;
            setDrops(
                Array.from({ length: numDrops }, (_, i) => ({
                    id: i,
                    initialX:
                        Math.random() *
                        (typeof window !== "undefined"
                            ? window.innerWidth
                            : 1000),
                    delay: Math.random() * 5,
                })),
            );
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            setDrops([]);
        }
    }, [start]);

    if (drops.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: -1,
                opacity: isAnimating ? 1 : 0,
                transition: "opacity 0.5s ease-out",
            }}
        >
            {drops.map((drop) => (
                <RainDrop
                    key={drop.id}
                    initialX={drop.initialX}
                    delay={drop.delay}
                    start={isAnimating}
                />
            ))}
        </div>
    );
};

export default RainContainer;
