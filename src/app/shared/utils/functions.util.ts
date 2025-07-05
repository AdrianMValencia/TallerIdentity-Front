import { COLORS_BADGE } from './global-constants.util';

export function getStateBadge(label: string, tooltip?: string) {
  let generalCss =
    'max-w-26 overflow-hidden truncate text-center font-medium p-1.5 rounded-lg text-xs border m-auto ';

  let badge = {
    tooltip,
    label,
    css: generalCss + COLORS_BADGE.main,
  };

  if (['Activo'].includes(label)) {
    badge.css = generalCss + COLORS_BADGE.custom4;
  }

  if (['Inactivo'].includes(label)) {
    badge.css = generalCss + COLORS_BADGE.gray;
  }

  if (label == undefined) {
    badge.css = 'hidden';
  }

  return badge;
}

export function getIcon(
  iconName: string,
  tooltip: string
) {
  let generalCss = 'flex justify-center items-center p-1.5 w-fit rounded-full ';

  let iconObj: any = {
    tooltip: null,
    icon: null,
    css: null,
  };

  iconObj = {
    tooltip,
    icon: iconName,
    css: generalCss + COLORS_BADGE.main,
  };
  if (['edit'].includes(iconName)) {
    iconObj.css = generalCss + COLORS_BADGE.main;
  }

  if (['icDownload', 'icCloudDownload'].includes(iconName)) {
    iconObj.css = generalCss + COLORS_BADGE.green;
  }

  if (['delete'].includes(iconName)) {
    iconObj.css = generalCss + COLORS_BADGE.red;
  }

  return iconObj;
}
