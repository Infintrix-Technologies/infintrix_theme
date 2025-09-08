import React from "react";

interface FloatingButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FloatingButton(props: FloatingButtonProps) {
    const buttonStyle: React.CSSProperties = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#691551",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "24px",
        cursor: "pointer",
        transition: "transform 0.2s, background-color 0.2s",
    };

    const hoverStyle: React.CSSProperties = {
        transform: "scale(1.1)",
        backgroundColor: "#af3d8f",
    };

    const [hover, setHover] = React.useState(false);

    return (
        <button
        onClick={props.onClick}
            style={hover ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            +
        </button>
    );
}
