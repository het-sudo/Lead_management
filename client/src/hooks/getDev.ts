import { useCallback, useEffect, useState } from "react";
import { getDeveloper } from "@/services/devService";
import type { GetDevelopersQuery } from "@/types/developer";

export const useDevelopers = (page: number, limit: number) => {
  const [data, setData] = useState<GetDevelopersQuery[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getDeveloper(limit, page);

      const list = res.data || [];
      const totalCount = res.meta?.totalCount || 0;

      setData(list);
      setTotalPages(Math.max(1, Math.ceil(totalCount / limit)));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    totalPages,
    loading,
    refetch: fetchData,
  };
};
