// services/arkivTypes.ts

export type ArkivAttributes = Record<string, string>;

export interface ArkivEntity<TPayload = unknown> {
  entityKey: string;
  attributes: ArkivAttributes;
  payload: TPayload | null;
  expiresAtBlock: string | null;
}

// Payloads según lo que guarda tu backend

export interface DaoPayload {
  id: number;
  createdAt: string;
  name: string;
  description?: string | null;
  ownerAddress: string;
  version: number;
}

export type DaoEntity = ArkivEntity<DaoPayload>;

export type MembershipRole = "OWNER" | "CONTRIBUTOR" | "VIEWER";

export interface MembershipPayload {
  userAddress: string;
  daoKey: string;
  role: MembershipRole;
  createdAt: string;
  version: number;
}

export type MembershipEntity = ArkivEntity<MembershipPayload>;

export type ProposalStatus = "open" | "closed" | "archived";

export interface ProposalPayload {
  id: number;
  createdAt: string;
  deadline?: string | null;
  title: string;
  budget?: number | null;
  description?: string | null;
  daoKey: string;
  status: ProposalStatus;
  version: number;
}

export type ProposalEntity = ArkivEntity<ProposalPayload>;

export type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskPayload {
  id: number;
  createdAt: string;
  deadline?: string | null;
  title: string;
  budget?: number | null;
  description?: string | null;
  proposalKey: string;
  daoKey: string;
  status: TaskStatus;
  version: number;
}

export type TaskEntity = ArkivEntity<TaskPayload>;
