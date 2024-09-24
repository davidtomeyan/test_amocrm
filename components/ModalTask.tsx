import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { CloseIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";

import { useTask } from "@/hooks/useTask";
import { Indicator } from "@/components/icons";

interface IProps {
  openDirection: "up" | "down";
  selectedId: number;
  closest_task_at: number;
  leadName: string;
  onClose: () => void;
}

const ModalTask = ({
  leadName,
  openDirection,
  selectedId,
  onClose,
  closest_task_at,
}: IProps) => {
  const [i, setI] = useState<-1 | 0 | 1 | null>(null);

  const { loading, task, error } = useTask(selectedId, closest_task_at);

  useEffect(() => {
    if (!task) return;
    const today = new Date(Date.now()).getDate();
    const taskDay = new Date((task?.complete_till || 0) * 1000).getDate();

    if (taskDay < today) return setI(-1);
    if (taskDay > today) return setI(1);
    if (taskDay === today) return setI(0);
  }, [task?.id]);

  return (
    <div
      className={clsx([
        "flex flex-col w-full max-w-lg bg-blue-950 z-10 absolute left-1/2 -translate-x-1/2 p-3  shadow-lg rounded-md",
        "transition-all transform duration-500",
        openDirection === "up" ? "bottom-1/2" : "top-1/2",
      ])}
    >
      <Indicator i={i} />
      <button
        className="self-end p-1"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
      >
        <CloseIcon className="text-gray-100"/>
      </button>

      {error ? (
        <div>{error}</div>
      ) : loading ? (
        <Spinner className="h-full" />
      ) : (
        <div>
          <h5 className="text-large text-gray-100">{leadName}</h5>
          <ul className="flex flex-wrap gap-2">
            {!task ? (
              <li className="text-gray-400">Дата задачи: Нет задачи</li>
            ) : (
              <>
                <li className="text-gray-400">
                  Дата задачи:{" "}
                  {!task
                    ? "Нет задачи"
                    : new Date(task.complete_till * 1000).toLocaleDateString()}
                </li>
                <li className="text-gray-400">ID задачи: {task.id}</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModalTask;
