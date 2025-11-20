import React from "react";
import { ProgressIndicator, ProgressStep } from "@carbon/react";

interface UWCProgressStep {
    id: string;
    label: string;
    description?: string;
    state?: 'current' | 'complete' | 'disabled' | 'error';
    onClick?: () => void;
}

interface UWCProgressIndicatorProps {
    steps: UWCProgressStep[];
    currentIndex: number;
    onChange?: (index: number, stepId: string) => void;
    vertical?: boolean;
    spaceEqually?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const UWCProgressIndicator: React.FC<UWCProgressIndicatorProps> = ({
    steps,
    currentIndex,
    onChange,
    vertical = false,
    spaceEqually = false,
}) => {
    const handleChange = (index: number) => {
        const step = steps[index];
        if (onChange) {
            onChange(index, step.id);
        }
    };
    return (
        <ProgressIndicator
            vertical={vertical}
            spaceEqually={spaceEqually}
            currentIndex={currentIndex}
            onChange={handleChange}
        >
            {steps.map((step, index) => {
                const isCurrent = step.state === "current" || index === currentIndex;
                const isComplete = step.state === "complete" || index < currentIndex;
                const isDisabled = step.state === "disabled";
                const isError = step.state === "error";
                
                return (
                    <ProgressStep
                    key={step.id}
                    label={step.label}
                    description={step.description}
                    current={isCurrent}
                    complete={isComplete}
                    disabled={isDisabled}
                    invalid={isError}
                    onClick={step.onClick}
                />
                )
            })}
        </ProgressIndicator>
    );
}