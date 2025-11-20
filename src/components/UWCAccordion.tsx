import React from 'react';
import { Accordion, AccordionItem } from '@carbon/react';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface UWCAccordionProps {
    items: AccordionItem[];
    size?: 'sm' | 'md' | 'lg';
    openItems?: string[];
    onToggleItem?: (id: string, isOpen: boolean) => void;
}

export const UWCAccordion: React.FC<UWCAccordionProps> = ({
    items,
    size = 'md',
    openItems = [],
    onToggleItem,
}) => {
    const handleToggle = (id: string) => {
        const isOpen = openItems.includes(id);
        if (onToggleItem) {
            onToggleItem(id, !isOpen);
        }
    };
    return (
        <Accordion size={size}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    title={item.title}
                    open={openItems.includes(item.id)}
                    onClick={() => handleToggle(item.id)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </Accordion>
    );
}