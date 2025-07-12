export interface SplitButton {
  type: 'action' | 'button';
  id?: string;
  icon?: string;
  label: string;
  value?: number;
  classes?: {
    icon?: string;
  };
  size?: string;
}

export enum Actions {
  ACTUALIZAR_LISTADO = 1,
  REFRESCAR_FILTROS = 2,
}
