import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MenuFilterTable } from '@shared/models/reusables/filter-menu-states.interface';
import { FilterCheckboxComponent } from '../filter-checkbox/filter-checkbox.component';

@Component({
  standalone: true,
  selector: 'app-filter-menu-states',
  imports: [
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
    MatMenu,
    FilterCheckboxComponent,
  ],
  templateUrl: './filter-menu-states.component.html',
})
export class FilterMenuStatesComponent {
  // Recibe un objeto de tipo MenuFilterTable que representa la configuración del filtro de menú
  @Input() menuFilter!: MenuFilterTable;

  // Recibe un filtro inicial que puede ser una cadena (por ejemplo, para marcar ciertos ítems)
  @Input() initfilters: string = null!;

  // Bandera booleana para indicar si se debe reiniciar el filtro
  @Input() reset: boolean = false;

  // Emite un evento al componente padre con los datos seleccionados (checked)
  @Output() dataChecked = new EventEmitter<any>();

  // Método que se ejecuta cuando se selecciona o marca una opción
  // Recibe un evento o valor (e) y lo emite al componente padre
  checkedTrue(e: any) {
    this.dataChecked.emit(e);
  }
}
