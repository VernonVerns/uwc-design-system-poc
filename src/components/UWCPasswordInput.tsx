import React from "react";
import { PasswordInput } from "@carbon/react";

interface PasswordInputProps {
    id: string;
    labelText: string;
    placeholder?: string;
    helperText?: string;
    invalid?: boolean;
    invalidText?: string;
    hidePasswordLabel?: string;
    showPasswordLabel?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hideLabel?: boolean;
}

export const UWCPasswordInput: React.FC<PasswordInputProps> = ({
    id,
    labelText,
    placeholder = "Enter password",
    helperText,
    invalid,
    invalidText,
    hidePasswordLabel = "Hide password",
    showPasswordLabel = "Show password",
    size = "md",
    disabled = false,
    value,
    onChange,
    hideLabel = false,
}) => {
    return(
        <PasswordInput
            id={id}
            labelText={hideLabel ? undefined : labelText}
            placeholder={placeholder}
            helperText={helperText}
            invalid={invalid}
            invalidText={invalidText}
            hidePasswordLabel={hidePasswordLabel}
            showPasswordLabel={showPasswordLabel}
            size={size}
            disabled={disabled}
            value={value}
            onChange={onChange}
            hideLabel={hideLabel}
        />
    )
} 