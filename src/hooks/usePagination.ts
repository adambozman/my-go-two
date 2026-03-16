import { useEffect, useMemo, useState } from "react";

interface UsePaginationOptions<T> {
  items: T[];
  pageSize?: number;
  resetKeys?: unknown[];
}

export function usePagination<T>({
  items,
  pageSize = 6,
  resetKeys = [],
}: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, resetKeys);

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
