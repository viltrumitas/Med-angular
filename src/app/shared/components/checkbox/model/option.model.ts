export interface CheckboxOption<T = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
}

export type CheckboxSelectionMode = 'single' | 'multiple';
