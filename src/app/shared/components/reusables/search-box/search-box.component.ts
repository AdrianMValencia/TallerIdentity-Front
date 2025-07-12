import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { scaleInOutAnimation } from '@shared/animations/scale-in-out.animation';
import {
  SearchBox,
  SearchOptions,
} from '@shared/models/reusables/search-options.interface';

@Component({
  standalone: true,
  selector: 'app-search-box',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatTooltip,
    NgClass,
    MatMenuModule,
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  animations: [scaleInOutAnimation],
})
export class SearchBoxComponent implements OnInit {
  // Inyección del servicio FormBuilder para crear el formulario reactivo
  private readonly fb = inject(FormBuilder);

  // Formulario reactivo que contiene los campos de búsqueda
  form$!: FormGroup;

  // Recibe un array de opciones para el selector de criterios de búsqueda
  @Input() searchOptions!: SearchOptions[];

  // Valor actual del campo de texto de búsqueda
  @Input() currentValue: string = '';

  // Emisor de eventos para enviar los datos de búsqueda al componente padre
  @Output() search = new EventEmitter<SearchBox>();

  // Objeto que representa la opción de búsqueda seleccionada actualmente
  labelSelection: SearchOptions = {
    label: '',
    value: 0,
    placeholder: '',
    validation: '',
    validation_desc: '',
    icon: '',
  };

  // Hook que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Se construye el formulario reactivo con dos campos:
    // - searchValue: el criterio de búsqueda seleccionado (ej: por nombre, por código)
    // - searchData: el valor que el usuario escribe para buscar
    this.form$ = this.fb.group({
      searchValue: [''], // Representa el numFilter del Backend
      searchData: [''], // Representa el textFilter del Backend
    });

    // Se selecciona por defecto la primera opción de búsqueda
    this.changeSelection(this.searchOptions[0]);

    // Si el campo de texto de búsqueda queda vacío, se realiza una búsqueda vacía
    this.form$.controls['searchData'].valueChanges.subscribe((e) => {
      if (e.trim() == '') {
        this.submit();
      }
    });
  }

  // Cambia la opción de búsqueda seleccionada (por ejemplo: buscar por nombre, código, etc.)
  changeSelection(option: SearchOptions) {
    this.labelSelection = option; // Se actualiza la opción seleccionada

    // Se asigna el valor de la opción al campo 'searchValue' del formulario
    this.form$.controls['searchValue'].setValue(option.value);

    // Se actualiza la descripción de la validación, si existe
    this.labelSelection.validation_desc = option.validation_desc
      ? option.validation_desc
      : '';

    // Se establece una longitud mínima para la búsqueda, por defecto 1
    let min_length = option.min_length ? option.min_length : 1;

    // Se aplican las validaciones al campo de texto de búsqueda
    this.setSearchStringValidation(option.validation, min_length);
  }

  // Aplica validaciones dinámicas al campo de texto según la opción seleccionada
  setSearchStringValidation(validation: [], minLength: number) {
    let searchData = this.form$.get('searchData');

    let setValidation = [];

    // Valida que el campo no esté vacío
    setValidation.push(Validators.required);

    // Valida que tenga una longitud mínima
    setValidation.push(Validators.minLength(minLength));

    // Si hay validaciones personalizadas, se agregan también
    if (validation) {
      validation.forEach((e) => {
        setValidation.push(e);
      });
    }

    // Se asignan los validadores al campo y se actualiza su estado
    searchData!.setValidators(setValidation);
  }

  // Emite los datos actuales del formulario como evento de búsqueda
  submit() {
    let data = this.form$.getRawValue(); // Obtiene los valores sin procesar del formulario
    this.search.emit(data); // Emite el objeto con { searchValue, searchData }
  }

  // Limpia el campo de texto de búsqueda y lanza una búsqueda vacía
  reset() {
    this.form$.controls['searchData'].setValue('');
    this.submit();
  }
}
