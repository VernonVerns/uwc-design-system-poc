import React from "react";
import { TextArea } from "@carbon/react";

interface TextAreaProps {
    id: string;
    labelText: string;
    placeholder?: string;
    helperText?: string;
    invalid?: boolean;
    invalidText?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    hideLabel?: boolean;
    enableCounter?: boolean;
    counterMode?: "character" | "word";
    maxCount?: number;
}

export const UWCTextArea: React.FC<TextAreaProps> = ({
    id,
    labelText,
    placeholder,
    helperText,
    invalid,
    invalidText,
    rows = 4,
    cols,
    disabled = false,
    value = "",
    onChange,
    hideLabel = false,
    enableCounter = false,
    counterMode = "character",
    maxCount = 250,
}) => {
    return(
        <TextArea 
            id={id}
            labelText={labelText}
            placeholder={placeholder}
            helperText={helperText}
            invalid={invalid}
            invalidText={invalidText}
            rows={rows}
            cols={cols}
            disabled={disabled}
            value={value}
            onChange={onChange}
            hideLabel={hideLabel}
            enableCounter={enableCounter}
            counterMode={counterMode}
            maxCount={maxCount}
        />
    )
}