import { LeadView } from "..";
import { Lead } from "../../../../Lead";

export interface ILeadsState {
  loading: boolean;
  error: string | undefined;
  leads: Lead[];
  reminderCreating: boolean;
  reminderCreatingResult?: string;
  reminderDate?: Date;
  reminderDialogVisible: boolean;
  selectedLead?: Lead;
  submitCardDialogVisible: boolean;
  view: LeadView;
}