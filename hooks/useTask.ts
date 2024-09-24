import { useEffect, useState } from "react";

import { ITasks, ITask } from "@/services/crm";

export const useTask = (id: number, data: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [task, setTask] = useState<ITask | undefined>(undefined);

  const initData = async () => {
    if (!id) return;
    setLoading(true);
    const params = new URLSearchParams();

    params.set("filter[entity_id]", `${id}`);
    const tasks: ITasks = await fetch(`/api/tasks?${params.toString()}`).then(
      (res) => res.json(),
    );

    if (tasks.error) {
      setError(tasks.error);

      return setLoading(false);
    }
    const task = tasks._embedded.tasks.find((i) => i.complete_till === data);

    setTask(task);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [id]);

  return { loading, error, task };
};
