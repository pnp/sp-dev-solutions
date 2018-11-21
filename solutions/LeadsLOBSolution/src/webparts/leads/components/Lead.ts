export interface Lead {
  account: string;
  change: number;
  comments: LeadComment[];
  createdBy: Person;
  createdOn: string;
  description?: string;
  percentComplete: number;
  requiresAttention?: boolean;
  title: string;
  url?: string;
}

export interface LeadComment {
  comment: string;
  createdBy: Person;
  date: string;
}

export interface Person {
  email: string;
  name: string;
}