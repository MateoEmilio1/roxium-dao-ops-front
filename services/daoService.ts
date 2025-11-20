// services/daoService.ts
import { apiClient } from "./apiClient";
import {
  DaoEntity,
  MembershipEntity,
  ProposalEntity,
  TaskEntity,
} from "./arkivTypes";

// ---------- Inputs / outputs ----------

export interface CreateDaoInput {
  name: string;
  description?: string;
  ownerAddress?: string;
}

export interface CreateDaoResponse {
  daoKey: string;
  daoTxHash: string;
  membershipKey: string;
  membershipTxHash: string;
  ownerAddress: string;
}

export interface DaoListResponse {
  count: number;
  daos: DaoEntity[];
}

export interface DaoDetailResponse {
  daoKey: string;
  dao: DaoEntity;
  memberships: MembershipEntity[];
}

export interface DaoBoardResponse {
  daoKey: string;
  dao: DaoEntity;
  proposals: ProposalEntity[];
  tasks: TaskEntity[];
}

export type MembershipRole = "OWNER" | "CONTRIBUTOR" | "VIEWER";

export interface AddMemberInput {
  userAddress: string;
  role: MembershipRole;
}

export interface AddMemberResponse {
  membershipKey: string;
  txHash: string;
}

// ---------- Servicios ----------

// Crear DAO (y membership OWNER inicial, lo hace el backend)
export async function createDao(
  input: CreateDaoInput
): Promise<CreateDaoResponse> {
  return apiClient.post<CreateDaoResponse>("/api/arkiv/daos", input);
}

// Obtener todos los DAOs
export async function getAllDaos(): Promise<DaoListResponse> {
  return apiClient.get<DaoListResponse>("/api/arkiv/daos");
}

// Obtener detalle de un DAO + memberships
export async function getDao(daoKey: string): Promise<DaoDetailResponse> {
  return apiClient.get<DaoDetailResponse>(`/api/arkiv/daos/${daoKey}`);
}

// Obtener "board" completo de un DAO (dao + proposals + tasks)
export async function getDaoBoard(daoKey: string): Promise<DaoBoardResponse> {
  return apiClient.get<DaoBoardResponse>(`/api/arkiv/daos/${daoKey}/board`);
}

// Agregar miembro a un DAO
export async function addMemberToDao(
  daoKey: string,
  input: AddMemberInput
): Promise<AddMemberResponse> {
  return apiClient.post<AddMemberResponse>(
    `/api/arkiv/daos/${daoKey}/members`,
    input
  );
}

export { DaoEntity };
