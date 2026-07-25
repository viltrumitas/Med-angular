export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type SelectValue = string | null;
