"use client";

import { Spinner } from "@nextui-org/spinner";
import { useCallback, useState } from "react";

import { useLeads } from "@/hooks/useLeads";
import LeadCard from "@/components/LeadCard";

// const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export default function Home() {
  const { error, loading, leads } = useLeads();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const onOpen = useCallback(
    (id: number) => () => {
      setSelectedId(id);
    },
    [],
  );

  if (error)
    return (
      <div className="flex flex-grow justify-center items-center text-center text-large">
        {error}
      </div>
    );

  return (
    <section className="flex flex-col flex-grow gap-4 py-8 md:py-10">
      {loading && (
        <div className="flex flex-grow h-full justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      <div className="flex flex-col">
        {!loading &&
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              divProps={{ onClick: onOpen(lead.id) }}
              isOpen={selectedId === lead.id}
              onClose={onClose}
              {...lead}
            />
          ))}
      </div>
    </section>
  );
}
