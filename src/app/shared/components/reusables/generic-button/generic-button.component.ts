import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { GenericButton } from '@shared/models/reusables/generic-button.interface';

@Component({
  standalone: true,
  selector: 'app-generic-button',
  imports: [MatIcon, MatTooltip],
  templateUrl: './generic-button.component.html',
})
export class GenericButtonComponent {
  // Recibe desde el componente padre un objeto con la información del botón (como texto, icono, estilos, etc.)
  @Input() infoButton!: GenericButton;

  // Emite un evento al componente padre cuando se hace clic sobre el botón
  @Output() clickButton = new EventEmitter();
}
