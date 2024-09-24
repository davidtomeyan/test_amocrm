export interface ILead {
  id: number;
  closest_task_at: number;
  price: number;
  name: string;
  _links: {
    self: {
      href: string;
    };
  };
}
export interface ILeads {
  error?: string;
  _embedded: {
    leads: ILead[];
  };
  _links?: {
    next?: { href: string };
  };
}
export interface ITask {
  id: number;
  complete_till: number;
  text: string;
}
export interface ITasks {
  error?: string;
  _embedded: {
    tasks: ITask[];
  };
}

export class CrmServes {
  private defaultHeaders: Headers = new Headers({
    Authorization: `Bearer ${process.env.AUTH_TOKEN!}`,
    "Content-Type": "application/json",
  });

  getLeads = async (params: string): Promise<ILeads> => {
    try {
      const response = await fetch(`${process.env.API_CRM!}/leads?${params}`, {
        headers: this.defaultHeaders,
      });

      if (!response.ok || response.status === 204) {
        return {
          error: response.statusText,
          _embedded: {
            leads: [],
          },
        };
      }

      return await response.json();
    } catch (err: any) {
      return {
        error: err.message || "Unknown error",
        _embedded: {
          leads: [],
        },
      };
    }
  };
  getTasksByLead = async (params: string): Promise<ITasks> => {
    try {
      const response = await fetch(`${process.env.API_CRM!}/tasks?${params}`, {
        headers: this.defaultHeaders,
      });

      if (!response.ok) {
        return {
          error: response.statusText,
          _embedded: {
            tasks: [],
          },
        };
      }
      if (response.status === 204) {
        return {
          _embedded: {
            tasks: [],
          },
        };
      }
      return await response.json();
    } catch (err: any) {
      return {
        error: err.message || "Unknown error",
        _embedded: {
          tasks: [],
        },
      };
    }
  };
}

export const crmServes = new CrmServes();
