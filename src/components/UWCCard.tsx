import React from "react";

interface UWCCardProps {
    image?: string;
    eyebrow: string;
    heading: string;
    headingLink: string;
    children: React.ReactNode;
}

export const UWCCard: React.FC<UWCCardProps> = ({
    image,
    eyebrow,
    heading,
    headingLink,
    children
}) => {
    return (
        <div className="uwc-card">
            {image && (
                <div className="card-image">
                    <img src={image} alt={heading} />
                </div>
            )}

            <div className="card-content">
                <p className="card-eyebrow">{eyebrow}</p>

                <a href={headingLink} className="card-heading">
                    {heading}
                </a>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
