// services/taskService.ts
import { apiClient } from "./apiClient";
import { TaskEntity } from "./arkivTypes";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface CreateTaskInput {
  proposalKey: string;
  daoKey: string;
  title: string;
  description?: string;
  budget?: number;
  deadline?: string; // ISO
  status?: TaskStatus;
}

export interface CreateTaskResponse {
  taskKey: string;
  txHash: string;
}

export interface TaskListResponse {
  count: number;
  tasks: TaskEntity[];
}

export interface TasksByProposalResponse {
  proposalKey: string;
  tasks: TaskEntity[];
}

export interface TaskDetailResponse {
  taskKey: string;
  task: TaskEntity;
}

// Crear task
export async function createTask(
  input: CreateTaskInput
): Promise<CreateTaskResponse> {
  return apiClient.post<CreateTaskResponse>("/api/arkiv/tasks", input);
}

// Obtener todas las tasks
export async function getAllTasks(): Promise<TaskListResponse> {
  return apiClient.get<TaskListResponse>("/api/arkiv/tasks");
}

// Obtener tasks por proposal
export async function getTasksByProposal(
  proposalKey: string
): Promise<TasksByProposalResponse> {
  return apiClient.get<TasksByProposalResponse>(
    `/api/arkiv/tasks/by-proposal/${proposalKey}`
  );
}

// Obtener detalle de una task
export async function getTask(taskKey: string): Promise<TaskDetailResponse> {
  return apiClient.get<TaskDetailResponse>(`/api/arkiv/tasks/${taskKey}`);
}
