import React from "react";
import { Information } from "@carbon/icons-react";

interface ScoreCardProps {
	value: string | number;
	label: string;
	borderedCard?: boolean;
	variant?: "primary" | "secondary";
	className?: string;
	borderRadius?:boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
	value,
	label,
	borderedCard = false,
	variant = "primary",
	className = "",
	borderRadius = false
}) => {
	// Variant colors (can adjust for your theme)
	const variantClasses: Record<"primary" | "secondary", string> = {
		primary: "primary-card",
		secondary: "secondary-card",
	};

	return (
		<div
			className={`score-card
				${variantClasses[variant]} 
				${borderedCard ? "bordered-card" : ""} 
				${borderRadius ? "border-radius" : "" }
				${className}`}
		>
			<h1 className="card-value">{value}</h1>
			<p className="card-label">{label}</p>

			{/* Floating info button */}
			<button
				type="button"
				className="info-tool-tip"
			>
				<Information size={"22"} />
			</button>
		</div>
	);
};

export default ScoreCard;
