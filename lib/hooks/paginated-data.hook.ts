import { useEffect, useMemo, useState } from 'react';

import { PaginatedResponse } from 'lib/types';

export const usePaginatedData = <T>(
  data?: PaginatedResponse<T> | null,
  clearCondition?: unknown,
) => {
  const [paginatedData, setPaginatedData] = useState<
    { data: T[]; page: number }[]
  >(data ? [{ page: data.pagination.currentPage, data: data.data }] : []);

  useEffect(() => {
    if (clearCondition) setPaginatedData([]);
  }, [clearCondition, setPaginatedData]);

  useEffect(() => {
    if (data && data.pagination.currentPage)
      setPaginatedData((prev) =>
        [
          ...prev.filter((el) => el.page !== data.pagination.currentPage),
          { page: data.pagination.currentPage, data: data.data },
        ].sort((a, b) => (a.page > b.page ? 1 : -1)),
      );
  }, [data]);

  const reducedData = useMemo(
    () =>
      paginatedData.reduce(
        (prev, cur) => [
          ...prev,
          ...cur.data.map((el) => ({ ...el, page: cur.page })),
        ],
        [] as (T & { page: number })[],
      ),
    [paginatedData],
  );

  const { minPage, maxPage } = useMemo(() => {
    let minPage = paginatedData.length ? paginatedData[0].page : 1;
    let maxPage = paginatedData.length ? paginatedData[0].page : 1;
    paginatedData.forEach((img) => {
      if (img.page < minPage) minPage = img.page;
      if (img.page > maxPage) maxPage = img.page;
    });
    return { minPage, maxPage };
  }, [paginatedData]);

  return { paginatedData, reducedData, minPage, maxPage, setPaginatedData };
};
