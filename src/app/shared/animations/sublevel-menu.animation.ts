import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const sublevelMenuAnimation = trigger('submenu', [
  state(
    'hidden',
    style({
      height: '0',
      overflow: 'hidden',
    })
  ),
  state(
    'visible',
    style({
      height: '*',
    })
  ),
  transition('visible <=> hidden', [
    style({ overflow: 'hidden' }),
    animate('{{ transitionParams }}'),
  ]),
  transition('void => *', animate(0)),
]);
