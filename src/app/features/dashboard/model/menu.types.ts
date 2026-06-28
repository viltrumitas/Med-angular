import { Type } from '@angular/core';

export interface SidebarItem {
  name?: string;
  path?: string;
  icon?: string;
  children?: SidebarItem[];
  separator?: boolean;
}
