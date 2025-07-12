export interface CheckBoxFilter {
  type: 'link' | 'subheading' | 'button';
  id?: 'all' | 'Activo' | 'Inactivo';
  icon?: string;
  label: string;
  value?: number | string | boolean;
  classes?: {
    icon?: string;
  };
  size?: string;
}

export interface FilterCheckbox {
  label: string;
  icon: string | null;
  cssIcon: string[];
  value: number | string | boolean;
}

export interface Task {
  label: string;
  completed: boolean;
  subtasks: SubTask[];
}

export interface SubTask {
  label: string;
  value: string;
  completed: boolean;
  icon?: string;
  cssIcon?: string;
}
