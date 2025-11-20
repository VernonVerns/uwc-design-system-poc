import React from "react";
import { Pagination } from '@carbon/react';

interface UWCPaginationProps {
    totalItems: number;
    onPageChange: (page: number) => void;
    size?: 'sm' | 'md' | 'lg';
    backwardText?: string;
    forwardText?: string;
    page: number;
    pageSize?: number;
    pageSizes: number[];
    disabled?: boolean;
    id: string;
}

export const UWCPagination: React.FC<UWCPaginationProps> = ({
    id,
    totalItems,
    onPageChange,
    size = 'md',
    backwardText = 'Previous page',
    forwardText = 'Next page',
    page = 1,
    pageSize = 10,
    pageSizes = [10, 20, 30, 40, 50],
}) => {
    return (
        <Pagination
            id={id}
            totalItems={totalItems}
            page={page}
            pageSize={pageSize}
            pageSizes={pageSizes}
            size={size}
            backwardText={backwardText}
            forwardText={forwardText}
            onChange={(event) => onPageChange(event.page)}
        />
    );
}
