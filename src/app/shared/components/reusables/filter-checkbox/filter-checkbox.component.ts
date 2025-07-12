import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import {
  FilterCheckbox,
  SubTask,
  Task,
} from '@shared/models/reusables/filter-checkbox.interface';

@Component({
  standalone: true,
  selector: 'app-filter-checkbox',
  imports: [MatCheckbox, MatIcon, NgClass, FormsModule],
  templateUrl: './filter-checkbox.component.html',
  styleUrl: './filter-checkbox.component.scss',
})
export class FilterCheckboxComponent {
  // Recibe un array de objetos con la información de cada checkbox
  @Input() checkData: FilterCheckbox[] = [];

  // Clave opcional que se puede incluir en el resultado emitido
  @Input() key = null;

  // Filtro inicial que puede ser usado para marcar ciertos checkboxes al iniciar
  @Input() initFilter: string = null!;

  // Bandera para reiniciar los filtros. Si se establece en true, se vuelve a aplicar el filtro inicial
  @Input() reset?: boolean = false;

  // Emisor de eventos para enviar los datos seleccionados al componente padre
  @Output() checkOut = new EventEmitter<any>();

  // Indica si todos los checkboxes están seleccionados
  allComplete: boolean = false;

  // Objeto principal que agrupa todos los checkboxes como subtareas
  private _task: Task = {
    label: 'TODOS', // Etiqueta del checkbox principal
    completed: false, // Indica si está completamente seleccionado
    subtasks: [] as SubTask[], // Lista de subtareas (checkboxes individuales)
  };

  // Getter para acceder al objeto task desde fuera del componente
  public get task(): Task {
    return this._task;
  }

  // Setter para actualizar el objeto task
  public set task(value: Task) {
    this._task = value;
  }

  constructor() {}

  // Hook que se ejecuta cuando el componente es inicializado
  ngOnInit(): void {
    this.getConfigurations(); // Carga las subtareas a partir del array checkData
    this.updateAllComplete(); // Verifica si todas las subtareas están marcadas
  }

  // Hook que se ejecuta cuando cambian las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    // Si la propiedad reset es verdadera, se reinician los valores de los checkboxes
    if (this.reset != undefined && this.reset != null) {
      this.task.subtasks.map((e: SubTask) => {
        e.completed = this.initFiltersChecked(e.value); // Marca o desmarca el checkbox según initFilter
        return e;
      });
      this.updateAllComplete(); // Actualiza el estado de selección global
    }

    // Si cambia el array checkData y no es la primera vez que se carga
    if (changes.checkData && changes.checkData.previousValue != undefined) {
      this.getConfigurations(); // Vuelve a cargar las configuraciones
    }
  }

  // Método que se llama cuando se modifica una selección
  updateData() {
    this.emitChecked(); // Emite los elementos seleccionados
    this.updateAllComplete(); // Actualiza si todos están seleccionados o no
  }

  // Verifica si todas las subtareas están seleccionadas
  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null && // Verifica que existan subtareas
      this.task.subtasks.every((t: any) => t.completed); // Comprueba que todas estén marcadas
    this.reset = false; // Después de actualizar, se desactiva la bandera de reinicio
  }

  // Emite al componente padre los valores seleccionados
  emitChecked() {
    let selected = [];

    // Filtra las subtareas marcadas y obtiene solo sus valores
    selected = this.task.subtasks
      .filter((e: any) => e.completed == true)
      .map((e: any) => e.value);

    // Si existe una clave, se agrega al resultado
    if (this.key) {
      selected.push(this.key);
    }

    // Emite los valores seleccionados al padre
    this.checkOut.emit(selected);
  }

  // Retorna true si al menos una subtarea está seleccionada, pero no todas
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false; // Si no hay subtareas, no hay selección parcial
    }
    return (
      this.task.subtasks.filter((t: any) => t.completed).length > 0 && // Al menos una marcada
      !this.allComplete // Pero no todas
    );
  }

  // Marca o desmarca todas las subtareas según el valor recibido
  setAll(completed: boolean) {
    this.allComplete = completed; // Actualiza el estado global

    // Si no hay subtareas, sale de la función
    if (this.task.subtasks == null) {
      return;
    }

    // Marca o desmarca cada subtarea
    this.task.subtasks.forEach((t: any) => (t.completed = completed));

    this.updateData(); // Llama a los métodos de actualización
  }

  // Crea las subtareas a partir de los datos recibidos (checkData)
  getConfigurations() {
    let setData: any = [];

    // Recorre cada item de checkData y lo transforma en una subtarea
    this.checkData.map((x) => {
      let newCheck = {
        value: x.value, // Valor del checkbox
        label: x.label, // Etiqueta a mostrar
        icon: x.icon, // Ícono si se usa
        cssIcon: x.cssIcon, // Clase CSS para el ícono
        completed: this.initFiltersChecked(x.value), // Estado marcado o no según el filtro inicial
      };
      setData.push(newCheck); // Se agrega al array final
    });

    // Se asigna el array de subtareas al objeto principal
    this.task.subtasks = setData;
  }

  // Verifica si un valor debe estar marcado según el filtro inicial
  initFiltersChecked(codigo: any) {
    // Si el filtro inicial es string o array, verifica si incluye el código actual
    if (typeof this.initFilter === 'string' || Array.isArray(this.initFilter)) {
      return this.initFilter.includes(codigo);
    }
    return false; // En cualquier otro caso, retorna false
  }
}
