import { useEffect, useState } from "react";

import { ILead, ILeads } from "@/services/crm";

export const useLeads = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [leads, setLeads] = useState<ILead[]>([]);
  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const initData = async () => {
    const params = new URLSearchParams();
    const chunks: ILead[] = [];

    const limit = 3;
    let page = 1;

    const getLids = async () => {
      params.set("page", page.toString());
      params.set("limit", limit.toString());
      const chunk: ILeads = await fetch(`/api/leads?${params.toString()}`).then(
        (res) => res.json(),
      );

      if (chunk.error) return setError(chunk.error);
      if (chunk._embedded.leads.length > 0) {
        chunks.push(...chunk._embedded.leads);
      }
      page += 1;
      if (chunk._links?.next) {
        await sleep(1000).then(async () => await getLids());
      }
    };

    await getLids();
    setLeads(chunks);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return { loading, error, leads };
};
