import { useEffect, useMemo, useState } from "react";

interface UsePaginationOptions<T> {
  items: T[];
  pageSize?: number;
  resetKeys?: unknown[];
  initialPage?: number;
}

const clampPage = (page: number, totalPages: number) => Math.min(Math.max(page, 1), totalPages);

export function usePagination<T>({
  items,
  pageSize = 6,
  resetKeys = [],
  initialPage = 1,
}: UsePaginationOptions<T>) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [currentPage, setCurrentPage] = useState(() => clampPage(initialPage, totalPages));
  const resetKeySignature = useMemo(() => JSON.stringify(resetKeys), [resetKeys]);

  useEffect(() => {
    setCurrentPage(clampPage(initialPage, totalPages));
  }, [initialPage, totalPages, resetKeySignature]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    totalItems: items.length,
    paginatedItems,
  };
}
