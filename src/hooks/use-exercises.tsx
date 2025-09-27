import axios from "axios";
import { redirect } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toaster } from "@/components/ui/toaster";
import { CreateExerciseBody } from "@/utils/types";

/**
 * This hook provides methods to fetch, update, and delete an authenticated user's exercise(s).
 */
export const useExercises = (exerciseId?: string) => {
  // get all
  const { data: exercises, refetch } = useQuery({
    enabled: false,
    queryKey: ["exercises"],
    queryFn: () => {
      axios.get(`/api/exercises`).then((res) => res.data);
    },
  });

  // post
  const { isPending: isLoadingCreate, mutate: create } = useMutation({
    mutationFn: (body: CreateExerciseBody) =>
      axios.post(`/api/exercises`, body),
    onSuccess: (response) => {
      const { exercise } = response.data;

      redirect(`exercises/${exercise.id}`);
    },
  });

  // update
  const { isPending: isLoadingUpdate, mutate: update } = useMutation({
    mutationFn: (body: CreateExerciseBody) =>
      axios.patch(`/api/exercises/${exerciseId}`, body),
    onSuccess: (response) => {
      const { exercise } = response.data;

      toaster.create({ description: "Exercise created", type: "info" });

      redirect(`exercises/${exercise.id}`);
    },
  });

  // destroy
  const { isPending: isLoadingDestroy, mutate: destroy } = useMutation({
    mutationFn: () => axios.delete(`/api/exercises/${exerciseId}`),
    onSuccess: () => {
      toaster.create({ description: "Exercise deleted", type: "info" });
    },
  });
  return {
    exercises,
    isLoadingCreate,
    isLoadingDestroy,
    isLoadingUpdate,
    create,
    destroy,
    update,
    refetch,
  };
};
