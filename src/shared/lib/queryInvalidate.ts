import { QueryClient } from "@tanstack/react-query";

export const invalidateQueries = (queryClient: QueryClient, queryKeys: string[]) => {
  queryKeys.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
};