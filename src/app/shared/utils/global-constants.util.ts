import { SelectResponse } from '@shared/models/commons/selects-response.interface';

export const userItems = [
  {
    icon: 'fal fa-user',
    label: 'Profile',
    actionKey: 'goProfile',
  },
  {
    icon: 'fal fa-cog',
    label: 'Settings',
    actionKey: 'goSetting',
  },
  {
    icon: 'fal fa-unlock-alt',
    label: 'Lock screen',
    actionKey: 'goLockScreen',
  },
  {
    icon: 'fal fa-power-off',
    label: 'Logout',
    actionKey: 'logout',
  },
];

export enum COLORS_BADGE {
  main = 'text-am-main-blue bg-am-main-blue-light border-am-main-blue',
  main_dark = 'text-white bg-am-main-blue border-am-main-blue',
  green = 'text-am-new-green-dark bg-am-new-green-light border-am-new-green-dark',
  green2 = 'text-am-new-green-dark bg-am-new-green border-am-new-green-dark',
  custom = 'text-am-main-custom3 bg-am-main-custom3-dark border-am-main-custom3',
  custom2 = 'text-am-main-blue2-dark bg-am-main-blue2 border-am-main-blue2-dark',
  custom3 = 'text-am-main-custom2-dark bg-am-main-custom2 border-am-main-custom2-dark',
  custom4 = 'text-white bg-am-main-custom4-dark border-am-main-custom4',
  orange = 'text-am-new-orange-dark bg-am-new-orange-light border-am-new-orange-dark',
  gray = 'text-am-gray-dark bg-am-gray-light border-am-gray-dark',
  teal = 'text-am-teal-dark bg-am-teal-light border-am-teal-dark',
  purple = 'text-am-new-purple-dark bg-am-new-purple-light border-am-new-purple-dark',
  red = 'text-am-new-red-dark bg-am-new-red-light border-am-new-red-dark',
  yellow = 'text-am-new-yellow-dark bg-am-new-yellow-light border-am-new-yellow-dark',
  pink = 'text-am-new-pink-dark bg-am-new-pink-light border-am-new-pink-dark',
  coral = 'text-am-coral-dark bg-am-coral-light border-am-coral-dark',
  whatsapp = 'text-white bg-am-new-green border-am-new-green',
}

export const statesSelect: SelectResponse[] = [
  { code: '1', description: 'Activo' },
  { code: '2', description: 'Inactivo' },
];
