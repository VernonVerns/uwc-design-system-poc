import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { UWCToast } from './UWCToast';

type ToastType = 'success' | 'info' | 'warning' | 'error';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface ToastItem {
    id: string;
    title: string;
    description?: string;
    duration?: number;
    position?: ToastPosition;
    type?: ToastType;
    actionLabel?: string;
    onAction?: () => void;
}

interface ToastContextValue {
    showToast: (payload: Omit<ToastItem, 'id'>) => string;
    hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = useCallback((payload: Omit<ToastItem, 'id'>) => {
        const id = Math.random().toString(36).slice(2, 9);
        setToasts((prev) => [...prev, { id, ...payload }]);
        return id;
    }, []);

    const hideToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter(t => t.id !== id));
    }, []);

    // group toasts by position -> array for rendering stacks
    const grouped = useMemo(() => {
        const map = new Map<string, ToastItem[]>();
        (['top-right','top-left','bottom-right','bottom-left'] as ToastPosition[]).forEach(p => map.set(p, []));
        toasts.forEach(t => {
            const pos = t.position ?? 'top-right';
            map.get(pos)!.push(t);
        });
        return map;
    }, [toasts]);

    return (
        <ToastContext.Provider value={{ showToast, hideToast}}>
            {children}

            {/* render one stack per position */}
            {Array.from(grouped.entries()).map(([position, items]) => {
                if (!items.length) return null;

                // wrapper that positions stacks better visually (stack column)
                const stackStyle: React.CSSProperties = {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    pointerEvents: 'none', // so only individual toasts capture events
                };

                return (
                    <div key={position} className={`toast-stack ${position}`} style={stackStyle}>
                        {items.map(item => (
                            // each Toast has its own internal pointer-events; wrapper is none
                            <div key={item.id} style={{ pointerEvents: 'auto' }}>
                                <UWCToast
                                    {...item}
                                    onClose={(id) => {
                                        hideToast(id);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );
            })}
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside a ToastProvider');
    return ctx;
};