import { TableColumns } from '@app/shared/models/reusables/list-table.interface';
import { UserResponse } from '../../models/user-response.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';

const tableColumns: TableColumns<UserResponse>[] = [
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
  {
    label: 'Nombre',
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'fullName',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'firstName',
    visible: true,
    download: true,
  },
  {
    label: 'Email', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'email',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'email',
    visible: true,
    download: true,
  },
  {
    label: 'Teléfono', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'phone',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'phone',
    visible: true,
    download: true,
  },
  {
    label: 'Dirección', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'address',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'text',
    sticky: false,
    sort: true,
    sortProperty: 'address',
    visible: true,
    download: true,
  },
  {
    label: 'Estado', // COLUMNA DE MI TABLA USUARIOS
    cssLabel: ['font-bold', 'text-xs', 'text-am-main-blue-dark'],
    property: 'stateDescription',
    cssProperty: ['text-xs', 'font-bold', 'whitespace-normal', 'max-w-120'],
    type: 'simpleBadge',
    sticky: false,
    sort: true,
    sortProperty: 'state',
    visible: true,
  },
];

const searchOptions = [
  {
    label: 'Nombres',
    value: 1,
    placeholder: 'Buscar por nombres',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Apellidos',
    value: 2,
    placeholder: 'Buscar por apellidos',
    validation: [GenericValidators.defaultDescription],
    validation_desc: 'Permite búsqueda por las primeras tres letras.',
    icon: 'tune',
  },
  {
    label: 'Email',
    value: 3,
    placeholder: 'Buscar por email',
    validation: [GenericValidators.emailValidation],
    validation_desc: 'Ingrese un email válido.',
    icon: 'tune',
  },
];

const initFilters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false
};

const filters = {
  numFilter: 0,
  textFilter: '',
  stateFilter: '1-0',
  refresh: false
};

export const componentUserSetting = {
  tableColumns,
  searchOptions,
  getInputs: '',
  initFilters,
  filters,
  initialSort: 'id',
  initialSortDir: 'desc',
  filename: 'lista-de-usuarios',
};
