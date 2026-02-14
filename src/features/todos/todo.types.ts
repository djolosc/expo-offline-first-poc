export type Todo = {
  id: string;
  title: string;
  completed: number;
  synced: number;
  updatedAt: number;
  retryCount: number;
  lastError: string | null;
};
