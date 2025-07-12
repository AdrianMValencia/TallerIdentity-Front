import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GenericValidators } from '@app/shared/utils/generic-validators.util';

@Component({
  standalone: true,
  selector: 'gs-text',
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './gs-text.component.html',
})
export class GsTextComponent implements OnInit, OnChanges {
  // Control de formulario reactivo que gestiona el input del texto
  @Input() inputControl: FormControl | any = new FormControl(null);

  // Etiqueta del campo de texto que se mostrará al usuario
  @Input() label: string = 'Input';

  // Texto que se mostrará como placeholder dentro del input
  @Input() placeholder: string = '';

  // Indica si el campo es obligatorio
  @Input() required: boolean = false;

  // Indica si el input debe aceptar solo texto (letras y espacios)
  @Input() onlyText?: boolean = false;

  // Modo del componente: 'create', 'read' o 'update'
  @Input() mode!: 'create' | 'read' | 'update';

  // Indica si el campo está en estado de carga
  @Input() isLoading: boolean = false;

  // Indica si se debe mostrar la etiqueta junto al campo
  @Input() withLabel: boolean = true;

  // Número máximo de caracteres permitidos en el campo
  @Input() maxLength: number = 100;

  // Objeto que indica si se debe mostrar un texto como prefijo o sufijo
  @Input() prefix_suffix: { label: string; mode: 'prefix' | 'suffix' } = {
    label: '',
    mode: 'prefix',
  };

  // Define un tipo de validador específico (por si se requiere lógica adicional)
  @Input() validatorType: string = '';

  // Lista de validadores activos para el input
  validator: any = [];

  constructor() {}

  // Hook que se ejecuta cuando cambian las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    for (let property in changes) {
      // Si cambia el modo, se reinicia el estado del input (habilitado o deshabilitado)
      if (property === 'mode') {
        this.initMode();
      }

      // Si cambia la propiedad 'required', se actualizan los validadores
      if (property === 'required') {
        this.setValidators();
      }
    }
  }

  // Hook que se ejecuta una sola vez al inicializar el componente
  ngOnInit(): void {
    this.initMode(); // Inicializa el modo de uso (habilitado o no)
    this.setOneError(); // Se asegura de mostrar solo un error a la vez
  }

  // Inicializa el comportamiento del campo según el modo actual
  private initMode() {
    this.setValidators(); // Establece los validadores correspondientes
    switch (this.mode) {
      case 'create':
        this.inputControl.enable(); // Habilita el campo para ingreso de datos
        break;
      case 'read':
        this.inputControl.disable(); // Deshabilita el campo (modo solo lectura)
        break;
      case 'update':
        // Solo habilita el campo si ya tiene un valor asignado
        if (this.inputControl.value != null) this.inputControl.enable();
        break;
      default:
        break;
    }
  }

  // Asegura que solo se muestre un error de validación a la vez
  setOneError() {
    this.inputControl.valueChanges.subscribe(() => {
      if (this.inputControl.errors) {
        let claves = Object.keys(this.inputControl.errors); // Lista de claves de errores
        let clave: string = claves[0]; // Toma el primer error encontrado
        let error: any = {};
        error[clave] = this.inputControl.errors[clave]; // Crea un nuevo objeto con solo ese error
        this.inputControl.setErrors(error); // Reemplaza todos los errores por uno solo
      } else {
        this.inputControl.setErrors(null); // Si no hay errores, se limpia
      }
    });
  }

  // Retorna el placeholder solo si el modo no es de solo lectura
  get placeholderValue() {
    return this.mode !== 'read' ? this.placeholder : '';
  }

  // Define las validaciones del campo de texto
  setValidators() {
    this.validator = [];

    // Valida que el texto tenga al menos 2 caracteres
    this.validator.push(Validators.minLength(2));

    // Valida el número máximo de caracteres según lo configurado
    this.validator.push(Validators.maxLength(this.maxLength));

    // Si es requerido, agrega validación para que no esté vacío y no contenga solo espacios
    if (this.required) {
      this.validator.push(Validators.required);
      this.validator.push(GenericValidators.notOnlyWhitespaceValidator);
    }

    // Si se permite solo texto, se aplica validador personalizado
    if (this.onlyText) {
      this.validator.push(GenericValidators.onlyTextOrSpaceValidator);
    }

    // Se asignan los validadores al control y se actualiza su estado
    this.inputControl.setValidators(this.validator);
    this.inputControl.updateValueAndValidity();
  }
}
