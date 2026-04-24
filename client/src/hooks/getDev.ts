import { useEffect, useState } from "react";
import { getDeveloper } from "@/services/devService";

export const useDevelopers = (page: number, limit: number) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getDeveloper(limit, page).then((res) => {
      const list = res.data || [];
      const totalCount = res.meta?.totalCount || 0;

      setData(list);
      setTotalPages(Math.max(1, Math.ceil(totalCount / limit)));
    });
  }, [page, limit]);

  return { data, totalPages };
};
