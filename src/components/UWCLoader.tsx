import React from 'react';

interface UWCLoaderProps {
    kind: "primary" | "secondary";
    glassy: boolean;
    tagline?: string;
}

const UWCLoader: React.FC<UWCLoaderProps> = ({
    kind = "secondary",
    glassy = true,
    tagline = 'A Place of Quality'
}) => {
    const letters = ['U', 'W', 'C'];
    const kindClasses: Record<"primary" | "secondary", string> = {
		primary: "light-color",
		secondary: "dark-color",
	};
    return (
        <div id="uwc_loader" 
            className={`
                ${kindClasses[kind]}
                ${glassy ? "glassy-bg" : ""}
            `}
        >
            <div className="uwc-letters">
                {letters.map((letter, index) => (
                <span 
                    key={index} 
                    className="uwc-letter"
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    {letter}
                </span>
                ))}
            </div>
            <div className="uwc-dots">
                <span className="uwc-dot"></span>
                <span className="uwc-dot"></span>
                <span className="uwc-dot"></span>
            </div>
            <p className="uwc-tagline">{tagline}</p>
        </div>
    );
}
export default UWCLoader;