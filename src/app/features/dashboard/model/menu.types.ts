export type SidebarAction = 'logout';
export type SidebarSection = 'nav' | 'footer';

export interface SidebarItem {
  name?: string;
  path?: string;
  icon?: string;
  children?: SidebarItem[];
  separator?: boolean;
  action?: SidebarAction;
  seciton?: SidebarSection;
}
