import { LeadView } from "..";
import { Lead } from "../../../../Lead";

export interface ILeadsState {
  loading: boolean;
  error: string | undefined;
  leads: Lead[];
  submitCardDialogVisible: boolean;
  view: LeadView;
}