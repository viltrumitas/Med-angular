export interface CaseUsage {
  totalAssignments: number;
  activeAssignments: number;
  lastUsedAt: string | null;
  neverUsed: boolean;
}