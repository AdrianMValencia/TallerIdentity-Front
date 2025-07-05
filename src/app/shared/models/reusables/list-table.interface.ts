export interface TableColumns<T> {
  property: string;
  label: string;
  visible: boolean;
  type: 'text' | 'number' | 'date' | 'datetime' | 'simpleBadge' | 'icon';
  cssProperty?: any;
  cssLabel?: any;
  cssSubProperty?: any;
  sort?: boolean;
  sortProperty?: string;
  action?: string;
  subProperty?: any;
  sticky?: boolean;
  download?: boolean;
}