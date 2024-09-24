"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { ILead } from "@/services/crm";

const ModalTask = dynamic(() => import("@/components/ModalTask"), {
  ssr: false,
});

interface IProps extends ILead {
  isOpen: boolean;
  onClose: () => void;
  divProps?: React.HTMLProps<HTMLDivElement>;
}

const LeadCard = ({
  id,
  closest_task_at,
  name,
  price,
  divProps,
  isOpen,
  onClose,
}: IProps) => {
  const [openDirection, setOpenDirection] = useState<"up" | "down">("down");
  const cardRef = useRef<HTMLDivElement>(null);

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      if (window.innerHeight - rect.bottom < 150) {
        setOpenDirection("up");
      } else {
        setOpenDirection("down");
      }
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative flex border rounded-sm hover:bg-primary-300 hover:cursor-pointer transition-all duration-200 ${isOpen ? "bg-primary" : ""}`}
      role={"button"}
      {...divProps}
    >
      <div className="basis-1/3 text-center border-r border-content4 p-5">
        <strong>{name}</strong>
      </div>
      <div className="basis-1/3 text-center border-r border-content4 p-5">
        Lead ID: {id}
      </div>
      <div className="basis-1/3 text-center p-5">{formattedPrice}</div>
      {isOpen && (
        <ModalTask
          closest_task_at={closest_task_at}
          leadName={name}
          openDirection={openDirection}
          selectedId={id}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default LeadCard;
