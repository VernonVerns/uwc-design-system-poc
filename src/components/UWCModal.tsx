import React from "react";
import { Modal } from "@carbon/react";

interface UWCModalProps {
    hasScrollingContent?: boolean;
    isFullWidth?: boolean;
    modalAriaLabel?: string;
    modalHeading?: string;
    modalLabel?: string;
    numberOfButtons?: 0 | 1 | 2 | 3;
    danger?: boolean;
    open: boolean;
    passiveModal?: boolean;
    preventCloseOnClickOutside?: boolean;
    size?: "xs" | "sm" | "md" | "lg";
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onRequestSubmit?: () => void;
    onRequestClose: () => void;
    children?: React.ReactNode;
}

export const UWCModal: React.FC<UWCModalProps> = ({
    hasScrollingContent = false,
    isFullWidth = false,
    modalAriaLabel,
    modalHeading,
    modalLabel,
    numberOfButtons = 2,
    danger = false,
    open,
    passiveModal = false,
    preventCloseOnClickOutside = false,
    size = "md",
    primaryButtonText = "Submit",
    secondaryButtonText = "Cancel",
    onRequestSubmit,
    onRequestClose,
    children,
}) => {
    return (
        <Modal
            open={open}
            aria-label={modalAriaLabel}
            modalHeading={modalHeading}
            modalLabel={modalLabel}
            hasScrollingContent={hasScrollingContent}
            isFullWidth={isFullWidth}
            passiveModal={passiveModal}
            preventCloseOnClickOutside={preventCloseOnClickOutside}
            size={size}
            danger={danger}
            primaryButtonText={numberOfButtons > 0 ? primaryButtonText : undefined}
            secondaryButtonText={numberOfButtons === 2 ? secondaryButtonText : undefined}
            onRequestClose={onRequestClose}
            onRequestSubmit={onRequestSubmit}
        >
            {children}
        </Modal>
    )
}