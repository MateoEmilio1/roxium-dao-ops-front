// hooks/useProposals.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createProposal,
  getAllProposals,
  getProposalsByDao,
  getProposal,
} from "@/services/proposalService";

import type {
  CreateProposalInput,
  CreateProposalResponse,
  ProposalDetailResponse,
  ProposalListResponse,
  ProposalsByDaoResponse,
} from "@/services/proposalService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unexpected error";
}

// ---- todas las proposals ----

export interface UseProposalsResult {
  data: ProposalListResponse | null;
  proposals: ProposalListResponse["proposals"];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProposals(): UseProposalsResult {
  const [data, setData] = useState<ProposalListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllProposals();
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useProposals error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProposals();
  }, [fetchProposals]);

  return {
    data,
    proposals: data?.proposals ?? [],
    loading,
    error,
    refetch: fetchProposals,
  };
}

// ---- proposals por DAO ----

export interface UseProposalsByDaoResult {
  data: ProposalsByDaoResponse | null;
  proposals: ProposalsByDaoResponse["proposals"];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProposalsByDao(
  daoKey: string | null
): UseProposalsByDaoResult {
  const [data, setData] = useState<ProposalsByDaoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(daoKey));
  const [error, setError] = useState<string | null>(null);

  const fetchByDao = useCallback(async () => {
    if (!daoKey) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getProposalsByDao(daoKey);
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useProposalsByDao error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [daoKey]);

  useEffect(() => {
    if (!daoKey) return;
    void fetchByDao();
  }, [daoKey, fetchByDao]);

  return {
    data,
    proposals: data?.proposals ?? [],
    loading,
    error,
    refetch: fetchByDao,
  };
}

// ---- detalle de una proposal (incluye tasks) ----

export interface UseProposalDetailResult {
  data: ProposalDetailResponse | null;
  proposal: ProposalDetailResponse["proposal"] | null;
  tasks: ProposalDetailResponse["tasks"];
  daoKey: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProposalDetail(
  proposalKey: string | null
): UseProposalDetailResult {
  const [data, setData] = useState<ProposalDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(proposalKey));
  const [error, setError] = useState<string | null>(null);

  const fetchProposal = useCallback(async () => {
    if (!proposalKey) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getProposal(proposalKey);
      setData(res);
    } catch (err) {
      const message = getErrorMessage(err);
      console.error("useProposalDetail error:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [proposalKey]);

  useEffect(() => {
    if (!proposalKey) return;
    void fetchProposal();
  }, [proposalKey, fetchProposal]);

  return {
    data,
    proposal: data?.proposal ?? null,
    tasks: data?.tasks ?? [],
    daoKey: data?.daoKey ?? null,
    loading,
    error,
    refetch: fetchProposal,
  };
}

// ---- crear proposal ----

export interface UseCreateProposalResult {
  mutate: (input: CreateProposalInput) => Promise<CreateProposalResponse>;
  loading: boolean;
  error: string | null;
  lastResult: CreateProposalResponse | null;
}

export function useCreateProposal(): UseCreateProposalResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<CreateProposalResponse | null>(
    null
  );

  const mutate = useCallback(
    async (input: CreateProposalInput): Promise<CreateProposalResponse> => {
      try {
        setLoading(true);
        setError(null);
        const res = await createProposal(input);
        setLastResult(res);
        return res;
      } catch (err) {
        const message = getErrorMessage(err);
        console.error("useCreateProposal error:", err);
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
