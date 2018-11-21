import { Lead } from "..";

export interface ILeadsState {
  loading: boolean;
  error: string;
  leads: Lead[];
  view: LeadView;
}

export enum LeadView {
  new,
  mostProbable,
  recentComments,
  requireAttention
}