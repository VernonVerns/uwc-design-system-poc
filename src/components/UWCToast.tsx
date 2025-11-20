import React, { useEffect, useState, useRef } from 'react';
import { Checkmark, Close, Error, Information, Warning } from '@carbon/icons-react';

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type ToastType = 'success' | 'info' | 'warning' | 'error'

interface ToastProps {
    id: string;
    title: string;
    description?: string;
    duration?: number;
    position?: ToastPosition;
    type?: ToastType;
    actionLabel?: string;
    onAction?: () => void;
    onClose: (id: string) => void;
}

const Icon: React.FC<{ type: ToastType}> = ({type}) => {
    switch(type) {
        case 'success':
            return (
                <Checkmark size={20} />
            );
        case 'info':
            return (
                <Information size={20} />
            );
        case 'warning':
            return (
                <Warning size={20} />
            );
        case 'error':
        default:
            return (
                <Error size={20} />
            );
    }
}

export const UWCToast: React.FC<ToastProps> = ({
    id,
    title,
    description,
    duration = 4000,
    position = 'top-right',
    type = 'info',
    actionLabel,
    onAction,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const remainingTime = useRef(duration);
    const startTime = useRef(Date.now());

    useEffect(() => {
        if (!paused) {
            startTime.current = Date.now();
            timerRef.current = setTimeout(() => {
                setVisible(false);
                setTimeout(() => onClose(id), 300);
            }, remainingTime.current);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [paused]);

    const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        remainingTime.current -= Date.now() - startTime.current;
        setPaused(true);
    };

    const handleMouseLeave = () => setPaused(false);

    const handleClose = () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        setVisible(false);
        setTimeout(() => onClose(id), 300);
    };

    const progressStyle: React.CSSProperties = {
        animationDuration: `${duration}ms`,
        animationPlayState: paused ? 'paused' : 'running',
    };

    return (
        <div
            id='uwc_toast'
            className={`toast-container ${position} ${visible ? 'toast-enter' : 'toast-exit'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="status"
            aria-live="polite"
        >
            <div className={`toast toast-${type}`}>
                <div className="toast-left">
                    <span className="toast-icon" aria-hidden>
                        <Icon type={type} />
                    </span>
                </div>
                <div className="toast-body">
                    <div className="toast-top">
                        <div className="toast-texts">
                            <div className="toast-title">{title}</div>
                            {description && <div className="toast-description">{description}</div>}
                        </div>

                        <button
                            className="toast-close"
                            onClick={handleClose}
                            aria-label="Close notification"
                            title="Close"
                        >
                            <Close size={20}/>
                        </button>
                    </div>
                    {actionLabel && (
                        <div className="toast-action-row">
                            <button
                                className="toast-action"
                                onClick={() => {
                                    try {
                                        onAction?.();
                                    } catch (e) {
                                        // swallow
                                    }
                                }}
                            >
                                {actionLabel}
                            </button>
                        </div>
                    )}
                    <div
                        className="toast-progress"
                        style={progressStyle}
                        aria-hidden
                    />
                </div>
                
            </div>
        </div>
    )
}