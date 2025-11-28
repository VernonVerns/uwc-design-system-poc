import React from "react";
import { User } from "@carbon/icons-react";

type AvatarSizes = "sm" | "md" | "lg" | "xl";
type AvatarShapes = "circle" | "square";
type AvatarStatuses = "online" | "offline" | "busy" | "away" | "none";
type StatusPositions = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface UWCAvatarProps {
    size: AvatarSizes;
    shape: AvatarShapes;
    status?: AvatarStatuses;
    imageUrl?: string;
    altText?: string;
    name?: string;
    className?: string;
    onClick?: () => void;
    statusPosition?: StatusPositions;
}

export const UWCAvatar: React.FC<UWCAvatarProps> = ({
    size,
    shape,
    status = "none",
    imageUrl,
    altText = "User Avatar",
    name,
    className = "",
    onClick,
    statusPosition = "bottom-right",
}) => {
  // Avatar base sizes
    const sizeClasses: Record<AvatarSizes, string> = {
        sm: "small-size",
        md: "medium-size",
        lg: "large-size",
        xl: "xlarge-size",
    };

  // Auto-scaling font sizes for initials
    const dynamicFontSize: Record<AvatarSizes, string> = {
        sm: "text-xs",
        md: "text-xl",
        lg: "text-2xl",
        xl: "text-4xl", 
    };

  // Auto-scaling icon sizes
    const iconSizes: Record<AvatarSizes, string> = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    const shapeClasses: Record<AvatarShapes, string> = {
        circle: "rounded-full",
        square: "rounded-none",
    };

  // Status colors
    const statusClasses: Record<AvatarStatuses, string> = {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-yellow-500",
        none: "hidden",
    };

  // Positioning of status dot
    const statusPositionClasses: Record<StatusPositions, string> = {
        "top-left": "top-1 left-1",
        "top-right": "top-1 right-1",
        "bottom-left": "bottom-1 left-1",
        "bottom-right": "bottom-1 right-1",
    };

  // Status dot auto-size
    const statusDotSize: Record<AvatarSizes, string> = {
        sm: "w-2 h-2",
        md: "w-2 h-2",
        lg: "w-3 h-3",
        xl: "w-4 h-4",
    };

    const getInitials = (name: string): string => {
        const cleanName = name.trim();
        if (!cleanName) return "";

        const parts = cleanName.split(/\s+/).filter(Boolean);
            if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }

        return (
            parts[0].charAt(0) + (parts[parts.length - 1]?.charAt(0) || "")
        ).toUpperCase();
    };

    const initials = name ? getInitials(name) : "";

    return (
        <div
            className={`uwc-avatar 
                ${sizeClasses[size]} 
                ${shapeClasses[shape]} 
                ${className} ${onClick ? "cursor-pointer" : ""}`}
            onClick={onClick}
        >
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={altText}
                className={`w-full h-full object-cover ${shapeClasses[shape]}`}
            />
        ) : name ? (
            <span
                className={`font-semibold ${dynamicFontSize[size]}`}
            >
                {initials}
            </span>
        ) : (
            <User className={`${iconSizes[size]}`} />
        )}

        {status !== "none" && (
            <span
                className={`absolute ${statusPositionClasses[statusPosition]} ${statusClasses[status]} ${statusDotSize[size]} border-2 border-white rounded-full`}
                style={{
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "white",
                }}
            ></span>
        )}
        </div>
    );
};
