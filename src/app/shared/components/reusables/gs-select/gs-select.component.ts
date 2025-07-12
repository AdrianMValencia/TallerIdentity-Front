import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { scaleInOutAnimation } from '@app/shared/animations/scale-in-out.animation';
import { SelectResponse } from '@app/shared/models/commons/selects-response.interface';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';
import { map, Observable, startWith } from 'rxjs';

@Component({
  standalone: true,
  selector: 'gs-select',
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './gs-select.component.html',
  animations: [scaleInOutAnimation],
  // Desactiva el encapsulamiento de estilos del componente.
  // Esto significa que los estilos definidos en este componente se aplicarán globalmente,
  // afectando otros componentes si coinciden los selectores CSS.
  // Útil cuando necesitas que los estilos del componente puedan heredar o sobrescribir estilos externos,
  // pero debes usarlo con precaución para evitar conflictos de estilos no deseados.
  encapsulation: ViewEncapsulation.None,
})
export class GsSelectComponent implements OnChanges {
  // Control de formulario que gestiona el valor del select; se desactiva si el modo es 'read'
  @Input() inputControl: FormControl | any = new FormControl({
    value: null,
    disabled: this.mode === 'read',
  });

  // Etiqueta que se mostrará junto al select
  @Input() label: string = '';

  // Texto placeholder dentro del select
  @Input() placeholder: string = '';

  // Opciones disponibles para mostrar en el select
  @Input() aOptions: SelectResponse[] = [];

  // Bandera para indicar si debe aplicarse visibilidad condicional a las opciones
  @Input() applyVisibility: boolean = false;

  // Indica si el campo es obligatorio
  @Input() required: boolean = false;

  // Modo actual del componente: crear, leer o actualizar
  @Input() mode?: 'create' | 'read' | 'update';

  // Indica si el componente está en estado de carga (loading)
  @Input() isLoading: boolean = false;

  // Indica si se debe mostrar o no la etiqueta del campo
  @Input() withLabel: boolean = true;

  // Mensaje de ayuda o sugerencia mostrado bajo el campo
  @Input() hint_message: string = '';

  // Opciones filtradas para el autocompletado
  filteredOptions?: Observable<any>;

  // Lista de códigos de las opciones disponibles (para validación)
  aCodes: any = [];

  // Hook que se ejecuta cada vez que cambian las propiedades de entrada
  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      // Si cambian las opciones, actualiza visibilidad, códigos, modo y validadores
      if (property === 'aOptions') {
        this.visibleOptions(); // Asegura que las opciones tengan visibilidad definida
        this.setCodesOptions(); // Extrae solo los códigos de las opciones
        this.initMode(); // Inicializa el modo (create, read, update)
        this.setValidators(); // Aplica las validaciones necesarias
      }

      // Si cambia el modo, lo vuelve a inicializar
      if (property === 'mode') {
        this.initMode();
      }

      // Si cambia la propiedad required, actualiza las validaciones
      if (property === 'required') {
        this.setValidators();
      }
    }
  }

  // Inicializa el comportamiento del campo según el modo actual
  initMode() {
    switch (this.mode) {
      case 'create':
        this.inputControl.enable(); // Habilita el control
        this.autocomplete(); // Activa el autocompletado
        break;
      case 'read':
        this.inputControl.disable(); // Desactiva el control para solo lectura
        break;
      case 'update':
        this.inputControl.enable(); // Habilita el control
        this.autocomplete(); // Activa el autocompletado
        break;
      default:
        break;
    }
  }

  // Define las validaciones para el control
  setValidators() {
    let validator = [];

    // Valida que el valor seleccionado exista en el array de códigos
    validator.push(GenericValidators.optionExistInArray(this.aCodes));

    // Valida que el array de opciones no esté vacío
    validator.push(GenericValidators.emptyArrayOptions(this.aOptions));

    // Si el campo es obligatorio, se agrega validación requerida
    if (this.required) {
      validator.push(Validators.required);
    }

    // Asigna los validadores al control y actualiza su estado
    this.inputControl.setValidators(validator);
    this.inputControl.updateValueAndValidity();
  }

  // Configura el observable para filtrar opciones según el valor escrito
  autocomplete() {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''), // Comienza con una cadena vacía
      map((value) => {
        return typeof value == 'string' ? this.filter(value) : this.visible();
      })
    );
  }

  // Retorna únicamente las opciones que tienen la propiedad visible en true
  private visible() {
    return this.aOptions.filter((option: any) => option.visible);
  }

  // Filtra las opciones según el texto ingresado y si están visibles
  private filter(value: any) {
    const filterValue = value.toLowerCase(); // Convierte a minúsculas para búsqueda insensible
    return this.aOptions.filter(
      (option: any) =>
        option.description.toLowerCase().includes(filterValue) && option.visible
    );
  }

  // Establece como visibles todas las opciones que no tengan definida la propiedad visible
  visibleOptions() {
    this.aOptions.map((option: any) => {
      if (option.visible == undefined) {
        option.visible = true;
      }
    });
  }

  // Extrae y guarda solo los códigos de todas las opciones
  setCodesOptions() {
    this.aCodes = this.aOptions.map((option) => option.code);
  }

  // Permite cambiar la visibilidad de una opción específica, si applyVisibility está activado
  setVisibleOptions(option: any, visible: any) {
    if (this.applyVisibility) {
      this.aOptions.map((optionA: SelectResponse) => {
        if (optionA.code === option) {
          optionA.visible = visible;
        }
      });
    }
  }

  // Muestra el texto descriptivo de una opción a partir de su código
  showDropdrown(sCodigo: string): any {
    let selectValue = null;

    // Si se pasó un código, busca la opción correspondiente
    if (sCodigo) {
      let Opcion = this.aOptions.find(
        (opcion: SelectResponse) => opcion.code === sCodigo
      );

      // Si se encontró, retorna su descripción; si no, retorna null
      selectValue = Opcion != undefined ? Opcion.description : null;
    }

    return selectValue;
  }
}
