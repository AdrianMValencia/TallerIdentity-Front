import { MenuFilterTable } from '@shared/models/reusables/filter-menu-states.interface';
import { GenericButton } from '@shared/models/reusables/generic-button.interface';
import { TableColumns } from '@shared/models/reusables/list-table.interface';
import { SplitButton } from '@shared/models/reusables/split-button.interface';
import { GenericValidators } from '@shared/utils/generic-validators.util';
import { RoleResponse } from '../../models/role-response.interface';

const tableColumns: TableColumns<RoleResponse>[] = [
  {
    label: 'Nombre',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'name',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'name',
    visible: true,
    download: true,
  },
  {
    label: 'Descripción',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'description',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'description',
    visible: true,
    download: true,
  },
  {
    label: 'Estado',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'stateDescription',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'simpleBadge',
    sticky: false,
    sort: true,
    sortProperty: 'state',
    visible: true,
  },
  {
    label: '',
    cssLabel: ['w-8'],
    property: 'icEdit',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'edit',
  },
  {
    label: '',
    cssLabel: ['w-8'],
    property: 'icDelete',
    cssProperty: [],
    type: 'icon',
    sticky: true,
    sort: false,
    sortProperty: '',
    visible: true,
    action: 'delete',
  },
];

const searchOptions = [
  {
    label: 'Nombre',
    value: 1,
    placeholder: 'Buscar por nombre',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Descripción',
    value: 2,
    placeholder: 'Buscar por descripción',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
];

const actionButtonRole: GenericButton = {
  label: 'Crear rol',
  icon: 'add',
  tooltip: 'Crear nuevo rol',
};

const menuItems: MenuFilterTable = {
  label: 'Estados',
  icon: 'filter_list',
  tooltip: 'Estados',
  menuItems: [
    {
      label: 'Activo',
      icon: 'label',
      cssIcon: ['text-am-new-green'],
      value: 1,
    },
    {
      label: 'Inactivo',
      icon: 'label',
      cssIcon: ['text-am-gray-light'],
      value: 0,
    },
  ],
};

const filterButtons: SplitButton[] = [
  {
    type: 'button',
    icon: 'refresh',
    label: 'Actualizar listado',
    value: 1,
  },
  {
    type: 'action',
    id: 'Pendiente',
    icon: 'restart_alt',
    label: 'Refrescar filtros',
    value: 2,
    classes: {
      icon: 'text-am-main-blue-dark text-md',
    },
  },
];

const initFilters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false,
};

const filters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false,
};

export const componentRoleSetting = {
  tableColumns,
  searchOptions,
  menuItems,
  filterButtons,
  actionButtonRole,
  getInputs: '',
  initFilters,
  filters,
  initialSort: 'id',
  initialSortDir: 'desc',
  filename: 'lista-de-roles',
};
