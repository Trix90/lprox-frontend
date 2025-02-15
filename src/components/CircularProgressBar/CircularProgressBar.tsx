import React from "react";
import './CircularProgressBar.css';

type CircularProgressBarProps = {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    percentage,
    size = 100,
    strokeWidth = 12,
    color = "#0086ff",
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = (percentage / 100) * circumference;
    const rotation = -90;
    strokeWidth = strokeWidth * (size / 100);

    return (
        <div className="progress-wrapper" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="rotate-[90deg]"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#8abaff"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - offset}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />
            </svg>
            <div className="percentage" style={{ fontSize: 20 * (size / 100) }}>
                %{percentage}
            </div>
        </div>
    );
};

export default CircularProgressBar;
