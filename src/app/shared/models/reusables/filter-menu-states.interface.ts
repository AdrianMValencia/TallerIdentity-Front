import { FilterCheckbox } from './filter-checkbox.interface';

export interface MenuFilterTable {
  label: string | null;
  icon: string | null;
  tooltip: string | null;
  menuItems: FilterCheckbox[];
}
