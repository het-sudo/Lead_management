import { useEffect, useState } from "react";
import axios from "axios";
import type { CreateTechInput } from "@/types/technology";

export const useTechnologies = (search: string) => {
  const [data, setData] = useState<CreateTechInput[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:8080/api/v1/technology", {
          params: {
            search,
            limit: 100,
          },
        });

        setData(res.data.data || []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return { data, loading };
};
