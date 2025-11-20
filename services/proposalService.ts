// services/proposalService.ts
import { apiClient } from "./apiClient";
import { ProposalEntity, TaskEntity } from "./arkivTypes";

export type ProposalStatus = "open" | "closed" | "archived";

export interface CreateProposalInput {
  daoKey: string;
  title: string;
  description?: string;
  budget?: number;
  deadline?: string; // ISO string
  status?: ProposalStatus;
}

export interface CreateProposalResponse {
  proposalKey: string;
  txHash: string;
}

export interface ProposalListResponse {
  count: number;
  proposals: ProposalEntity[];
}

export interface ProposalsByDaoResponse {
  daoKey: string;
  proposals: ProposalEntity[];
}

export interface ProposalDetailResponse {
  proposalKey: string;
  daoKey: string;
  proposal: ProposalEntity;
  tasks: TaskEntity[];
}

// Crear una proposal
export async function createProposal(
  input: CreateProposalInput
): Promise<CreateProposalResponse> {
  return apiClient.post<CreateProposalResponse>("/api/arkiv/proposals", input);
}

// Obtener todas las proposals
export async function getAllProposals(): Promise<ProposalListResponse> {
  return apiClient.get<ProposalListResponse>("/api/arkiv/proposals");
}

// Obtener proposals por DAO
export async function getProposalsByDao(
  daoKey: string
): Promise<ProposalsByDaoResponse> {
  return apiClient.get<ProposalsByDaoResponse>(
    `/api/arkiv/proposals/by-dao/${daoKey}`
  );
}

// Obtener detalle de una proposal + sus tasks
export async function getProposal(
  proposalKey: string
): Promise<ProposalDetailResponse> {
  return apiClient.get<ProposalDetailResponse>(
    `/api/arkiv/proposals/${proposalKey}`
  );
}
