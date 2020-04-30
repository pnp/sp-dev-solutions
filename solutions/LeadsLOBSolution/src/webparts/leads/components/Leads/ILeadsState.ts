import { Lead, LeadView } from "..";

export interface ILeadsState {
  loading: boolean;
  error: string | undefined;
  leads: Lead[];
  view: LeadView;
}