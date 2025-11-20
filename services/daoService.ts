// services/daoService.ts
import { apiClient } from "./apiClient";

// ---- Enums / tipos de estado y roles (alineados con el backend) ----

export type ProposalStatus = "open" | "closed" | "archived";
export type TaskStatus = "todo" | "in-progress" | "done";
export type MembershipRole = "OWNER" | "CONTRIBUTOR" | "VIEWER";

// ---- Tipos base Arkiv ----

export interface ArkivEntity<TPayload> {
  entityKey: string; // 👈 clave Arkiv, la usamos para navegar (daoKey, proposalKey, taskKey)
  attributes: Record<string, string>;
  payload: TPayload | null;
  expiresAtBlock: string | null;
}

// ---- Payloads de dominio (lo que guardamos en Arkiv) ----

export interface DaoPayload {
  id: number;
  createdAt: string;
  name: string;
  description?: string;
  ownerAddress: string;
  version: number;
}

export interface ProposalPayload {
  id: number;
  createdAt: string;
  deadline?: string | null;
  title: string;
  budget?: number | null;
  description?: string | null;
  daoKey: string; // entityKey de la DAO
  status?: ProposalStatus;
  version: number;
}

export interface TaskPayload {
  id: number;
  createdAt: string;
  deadline?: string | null;
  title: string;
  budget?: number | null;
  description?: string | null;
  daoKey: string; // entityKey de la DAO
  proposalKey: string; // entityKey de la proposal
  status?: TaskStatus;
  version: number;
}

export type DaoEntity = ArkivEntity<DaoPayload>;
export type ProposalEntity = ArkivEntity<ProposalPayload>;
export type TaskEntity = ArkivEntity<TaskPayload>;

// ---- Membership (user-on-dao) ----

export interface MembershipPayload {
  userAddress: string;
  daoKey: string; // entityKey de la DAO
  role: MembershipRole;
  createdAt: string;
  version: number;
}

export type MembershipEntity = ArkivEntity<MembershipPayload>;

// ---- Responses del backend ----

export interface DaoListResponse {
  count: number;
  daos: DaoEntity[];
}

export interface DaoDetailResponse {
  daoKey: string;
  dao: DaoEntity | null;
  memberships: MembershipEntity[];
}

export interface DaoBoardResponse {
  daoKey: string;
  dao: DaoEntity | null;
  proposals: ProposalEntity[];
  tasks: TaskEntity[];
}

// ---- Crear DAO ----

export interface CreateDaoInput {
  name: string;
  description?: string;
  ownerAddress?: string;
}

export interface CreateDaoResponse {
  daoKey: string; // entityKey de la DAO recién creada
  daoTxHash: string;
  membershipKey: string;
  membershipTxHash: string;
  ownerAddress: string;
}

// ---- Funciones de servicio (llaman a tu backend Express) ----

// GET /api/arkiv/daos → lista todas las DAOs
export async function getAllDaos(): Promise<DaoListResponse> {
  return apiClient.get<DaoListResponse>("/api/arkiv/daos");
}

// GET /api/arkiv/daos/:daoKey → DAO + memberships
export async function getDao(daoKey: string): Promise<DaoDetailResponse> {
  return apiClient.get<DaoDetailResponse>(`/api/arkiv/daos/${daoKey}`);
}

// GET /api/arkiv/daos/:daoKey/board → DAO + proposals + tasks
export async function getDaoBoard(daoKey: string): Promise<DaoBoardResponse> {
  return apiClient.get<DaoBoardResponse>(`/api/arkiv/daos/${daoKey}/board`);
}

// POST /api/arkiv/daos → crear DAO
export async function createDao(
  input: CreateDaoInput
): Promise<CreateDaoResponse> {
  return apiClient.post<CreateDaoResponse>("/api/arkiv/daos", input);
}
