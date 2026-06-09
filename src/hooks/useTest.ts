import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApiTest,
  getApiTestById,
  postApiTest,
  putApiTest,
  deleteApiTest,
} from "../services/testService";
import type { Test } from "../types";

// 🟢 Use React Query to fetch all tests
export const useGetTestsQuery = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: () => getApiTest(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};

// 🟢 Use React Query to fetch a test by ID
export const useGetTestByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["tests", id],
    queryFn: () => getApiTestById(id),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};

// 🟢 Use React Query to create a new test
export const usePostTestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Test) => postApiTest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });
};

// 🟢 Use React Query to update an existing test
export const usePutTestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Test }) =>
      putApiTest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });
};

// 🟢 Use React Query to delete a test
export const useDeleteTestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteApiTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });
};
