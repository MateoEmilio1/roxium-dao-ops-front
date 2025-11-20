// hooks/useTasks.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  getAllTasks,
  getTasksByProposal,
  getTask,
} from "@/services/taskService";

import type {
  CreateTaskInput,
  CreateTaskResponse,
  TaskDetailResponse,
  TaskListResponse,
  TasksByProposalResponse,
} from "@/services/taskService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unexpected error";
}

// ---- todas las tasks ----

export interface UseTasksResult {
  data: TaskListResponse | null;
  tasks: TaskListResponse["tasks"];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTasks(): UseTasksResult {
  const [data, setData] = useState<TaskListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllTasks();
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useTasks error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return {
    data,
    tasks: data?.tasks ?? [],
    loading,
    error,
    refetch: fetchTasks,
  };
}

// ---- tasks por proposal ----

export interface UseTasksByProposalResult {
  data: TasksByProposalResponse | null;
  tasks: TasksByProposalResponse["tasks"];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTasksByProposal(
  proposalKey: string | null
): UseTasksByProposalResult {
  const [data, setData] = useState<TasksByProposalResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(proposalKey));
  const [error, setError] = useState<string | null>(null);

  const fetchByProposal = useCallback(async () => {
    if (!proposalKey) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getTasksByProposal(proposalKey);
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useTasksByProposal error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [proposalKey]);

  useEffect(() => {
    if (!proposalKey) return;
    void fetchByProposal();
  }, [proposalKey, fetchByProposal]);

  return {
    data,
    tasks: data?.tasks ?? [],
    loading,
    error,
    refetch: fetchByProposal,
  };
}

// ---- detalle de una task ----

export interface UseTaskDetailResult {
  data: TaskDetailResponse | null;
  task: TaskDetailResponse["task"] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTaskDetail(taskKey: string | null): UseTaskDetailResult {
  const [data, setData] = useState<TaskDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(taskKey));
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!taskKey) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getTask(taskKey);
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useTaskDetail error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [taskKey]);

  useEffect(() => {
    if (!taskKey) return;
    void fetchTask();
  }, [taskKey, fetchTask]);

  return {
    data,
    task: data?.task ?? null,
    loading,
    error,
    refetch: fetchTask,
  };
}

// ---- crear task ----

export interface UseCreateTaskResult {
  mutate: (input: CreateTaskInput) => Promise<CreateTaskResponse>;
  loading: boolean;
  error: string | null;
  lastResult: CreateTaskResponse | null;
}

export function useCreateTask(): UseCreateTaskResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<CreateTaskResponse | null>(null);

  const mutate = useCallback(
    async (input: CreateTaskInput): Promise<CreateTaskResponse> => {
      try {
        setLoading(true);
        setError(null);
        const res = await createTask(input);
        setLastResult(res);
        return res;
      } catch (err) {
        const message = getErrorMessage(err);
        console.error("useCreateTask error:", err);
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    mutate,
    loading,
    error,
    lastResult,
  };
}
