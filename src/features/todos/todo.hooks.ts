import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFailedTodos, getTodos } from "./todo.repository";
import { createTodo } from "./todo.service";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => getTodos(),
  });
};

export const useAddTodo = () => {
  const qc = useQueryClient();

  return (title: string) => {
    createTodo(title);
    qc.invalidateQueries({ queryKey: ["todos"] });
  };
};

export const useFailedTodos = () => {
  return useQuery({
    queryKey: ["failedTodos"],
    queryFn: getFailedTodos,
  });
};
