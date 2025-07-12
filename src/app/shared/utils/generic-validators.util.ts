import { AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';

export class GenericValidators {
  static patternValidator(
    arg0: RegExp,
    arg1: { hasSpecialCharacters: boolean }
  ): import('@angular/forms').ValidatorFn {
    throw new Error('Method not implemented.');
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static alphanumeric(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9a-zA-Z]+$/.test(control.value)) return null;
      else return { alphanumeric: true };
    } else {
      return null;
    }
  }

  /* Validar que contenga al menos una numero */
  static hasNumber(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/\d/.test(control.value)) return null;
      else return { hasNumber: true };
    } else {
      return null;
    }
  }

  /* Validar que contenga al menos una letra mayuscula */
  static hasCapitalCase(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/[A-Z]/.test(control.value)) return null;
      else return { hasCapitalCase: true };
    } else {
      return null;
    }
  }

  /* Validar que contenga al menos una letra miniscula */
  static hasSmallCase(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/[a-z]/.test(control.value)) return null;
      else return { hasSmallCase: true };
    } else {
      return null;
    }
  }

  /* Validar que contenga al menos un caracter especial */
  static hasSpecialCharacters(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value))
        return null;
      else return { hasSpecialCharacters: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static defaultDescription(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9 a-zA-Z.ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/.test(control.value))
        return null;
      else return { defaultDescription: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static defaultName(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[a-zA-Z ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/.test(control.value)) return null;
      else return { defaultName: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static defaultBussinessName(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[a-zA-Z&.-_ ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]+$/.test(control.value))
        return null;
      else return { defaultBussinessName: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static document(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[a-zA-Z0-9]{7,12}$/.test(control.value)) return null;
      else return { document: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static numeric(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9.]+$/.test(control.value)) return null;
      else return { numeric: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static numericDecimal(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9]*[.]?[0-9]{1,2}$/.test(control.value)) return null;
      else return { numericDecimal: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números o caracteres de alfabeto */
  static deducible(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9]{1,3}$/.test(control.value)) {
        var number = Number(control.value.toString());
        if (
          (control.value.toString().length >= 3 && number > 100) ||
          number == 0
        ) {
          return { deducible: true };
        }
        return null;
      } else return { deducible: true };
    } else {
      return null;
    }
  }

  /* Valida un email */
  static emailValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+((?:\.[a-z]{2,4})+)*$/.test(
          control.value
        )
      )
        return null;
      else return { emailValidation: true };
    } else {
      return null;
    }
  }

  /* Valida un email del dominio materiagris.pe */
  static emailMateriaGrisValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[a-z.]+@materiagris\.pe$/.test(control.value)) return null;
      else return { emailMateriaGrisValidation: true };
    } else {
      return null;
    }
  }

  static SSOemailValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      let whitelist = '[a-z0-9.-]+.[a-z]{2,4}';
      var re = new RegExp('[a-zA-Z0-9._-]+@' + whitelist + '$');
      if (re.test(control.value)) return null;
      else return { SSOemailValidation: true };
    } else {
      return null;
    }
  }

  private static dniPattern =
    '(^(?!.*([1][2][3][4][5][6][7][8])).*)(^[0-9]{8,8}$)';
  private static cePattern = '^[a-zA-Z0-9]*$';
  private static legalNamePattern =
    "^[a-zA-Z0-9-,:()&$#.ÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü' ]*$";
  private static latinTextPattern = "^[A-Za-zÑñÁÉÍÓÚáéíóúÄËÏÖÜäëïöü' ]*$";

  static getLatinTextPattern(): string | RegExp {
    return this.latinTextPattern;
  }
  static getLegalNamePattern(): string {
    return this.legalNamePattern;
  }
  static getCePattern(): string {
    return this.cePattern;
  }
  static getDniPattern(): string {
    return this.dniPattern;
  }

  /* Validar que todos los caracteres no sean iguales */
  static notAllCharactersAreEqualValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.length == 8) {
      let areAllEqual: boolean = true;
      for (var i = 0; i < control.value.length; i++) {
        if (i > 0) {
          if (control.value.charAt(i) != control.value.charAt(i - 1))
            areAllEqual = false;
        }
      }
      if (areAllEqual == true) return { AllCharactersAreEqual: true };
      else return null; //validation was passed
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números */
  static onlyNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9]+$/.test(control.value)) return null;
      else return { IsNotNumber: true };
    } else {
      return null;
    }
  }

  /* Validar que todos los caracteres sean solo números mayores a 0 */
  static onlyNumbersGreaterZero(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[0-9]+$/.test(control.value) && control.value > 0) return null;
      else return { IsNotNumberGreaterZero: true };
    } else {
      return null;
    }
  }

  // Validar espacios en blancos
  static notOnlyWhitespaceValidator(control: FormControl) {
    const value = control.value;
    const isWhitespace = (value ?? '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  /* Validar que todos los caracteres sean caracteres de alfabeto y espacios */
  static onlyTextOrSpaceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (/^[A-ZÁÉÍÓÚÄËÏÖÜÑa-záéíóúäëïöüñ ]+$/.test(control.value)) return null;
      else return { IsNotTextOrSpace: true };
    } else {
      return null;
    }
  }

  /* Validar que el número de RUC solo pueda empezar con "10", "15", "17" y "20", en caso contrario será considerado no válido */
  static rucNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      if (
        control.value.toString().trim().substring(0, 2) == '10' ||
        control.value.toString().trim().substring(0, 2) == '15' ||
        control.value.toString().trim().substring(0, 2) == '17' ||
        control.value.toString().trim().substring(0, 2) == '20'
      ) {
        return null;
      } else return { notValidRUC: true };
    } else {
      return null;
    }
  }

  /* Validar que no dos contraseñas coincidan */
  static passwordMatch(
    controlPassword: AbstractControl,
    controlConfirmPassword: AbstractControl
  ) {
    if (
      controlPassword.value != null &&
      controlPassword.value.toString().trim() != '' &&
      controlConfirmPassword.value != null &&
      controlConfirmPassword.value.toString().trim() != ''
    ) {
      if (controlPassword.value != controlConfirmPassword.value)
        controlConfirmPassword.setErrors({ NoPasswordMatch: true });
      else controlConfirmPassword.setErrors(null);
    }
  }

  /* Validar que no haya más de 3 vocales juntas */
  static vowelLimitValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      let vowelCount = 0;
      for (let i = 0; i < control.value.toString().trim().length; i++) {
        if (
          /[AEIOUaeiouÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]/.test(
            control.value.toString().trim().charAt(i)
          )
        )
          vowelCount++;
        else if (
          /[\']/.test(control.value.toString().trim().charAt(i)) == false
        )
          vowelCount = 0;

        if (vowelCount > 3) return { moreThanThreeVowels: true };
      }
      return null;
    } else {
      return null;
    }
  }

  /* Validar que no haya 5 consonantes juntas */
  static consonantLimitValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null && control.value.toString().trim() != '') {
      let consonantCount = 0;
      for (let i = 0; i < control.value.toString().trim().length; i++) {
        if (
          /[qwrtypsdfghjklñzxcvbnmñ]/.test(
            control.value.toString().trim().toLowerCase().charAt(i)
          )
        )
          consonantCount++;
        else consonantCount = 0;

        if (consonantCount > 6) return { moreThanFiveConsonants: true };
      }
      return null;
    } else {
      return null;
    }
  }

  /* Validar el tipo de archivo */
  static validateAllowedFileType(arrayTypes: any): ValidatorFn {
    return function (
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (control.value) {
        let uploadFileIsAllowed = arrayTypes.includes(control.value.type);
        if (!uploadFileIsAllowed) {
          return { validate_file_type: true };
        }
      }
      return null;
    };
  }

  /* Validar el tamaño del archivo */
  static validateSizeFile(sizeMaxKB: any): ValidatorFn {
    return function (
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (control.value) {
        let fileSize = parseInt(control.value.size);
        let fileSizeMb = fileSize / 1024;
        if (fileSizeMb > sizeMaxKB) {
          return { validate_file_size: true };
        }
      }
      return null;
    };
  }

  /* Validar que un formArray no este vacio */
  static emptyArray(array: FormArray): { [key: string]: boolean } | null {
    if (array.controls.length === 0) {
      return { isEmptyArray: true };
    } else {
      return null;
    }
  }

  /* Validar que los caracteres sean mayor a un número específico */
  static onlyNumbersGreatersOrEqual(numberGreater: number): ValidatorFn {
    return function (
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (control.value != null && control.value.toString().trim() != '') {
        if (/^[0-9]+$/.test(control.value) && control.value >= numberGreater)
          return null;
        else return { IsNotNumberGreaterOrEqual: true };
      } else {
        return null;
      }
    };
  }

  /* Validar que la opcion elegida exista en el array de opciones */
  static optionExistInArray(aOptions: any): ValidatorFn {
    return function (
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (control.value != null && control.value.toString().trim() != "") { 
        if (aOptions.includes(control.value)) return null;
        else return { optionInvalid: true };
      } else {
        return null;
      }
    };
  }

   /* Validar que un array no este vacio */
   static emptyArrayOptions(arrayOptions: any): ValidatorFn {
    return function (
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (!arrayOptions.length) {
        return { isEmptyArrayOptions: true };
      } else {
        return null;
      }
    };
  }

  // validación de horario colaborador para registro de tareo
  static isIntoSchedule(validators: any): ValidatorFn {
    return function (
      control: any | AbstractControl
    ): { [key: string]: boolean } | null {
      let res = null;
      if (control.value != null && control.value.toString().trim() != '') {
        let validator = validators.find(
          (x: any) =>
            x.dDate ==
            control.parent.get('dFecha_Registro').value.format('YYYY-MM-DD')
        );

        if (
          validator.sEstado_Horario != 'FERIADO' &&
          validator.sEstado_Horario != 'FUERA_HORARIO_REGULAR'
        ) {
          let minutes = Number(control.parent.get('nMinutos').value);
          let entradaScheduleString = validator.entrada;
          let [entradaScheduleStringH, entradaScheduleStringM] =
            entradaScheduleString.split(':');
          let entradaSchedule =
            Number(entradaScheduleStringH) * 60 +
            Number(entradaScheduleStringM);
          let salidaScheduleString = validator.salida;
          let [salidaScheduleStringH, salidaScheduleStringM] =
            salidaScheduleString.split(':');
          let salidaSchedule =
            Number(salidaScheduleStringH) * 60 + Number(salidaScheduleStringM);
          let [entradaH, entradaM] = control.value.split(':');
          let entrada = Number(entradaH) * 60 + Number(entradaM);
          let salida = entrada + Number(minutes);

          if (entrada > entradaSchedule && entrada < salidaSchedule) {
            res = { isIntoSchedule: true };
          }
          if (salida > entradaSchedule && salida < salidaSchedule) {
            res = { isIntoSchedule: true };
          }
        }
      }
      return res;
    };
  }

  // Validar que las horas ingresadas sean secuanciales
  static marksNotSequence(formArray: FormArray): null {
    if (formArray.length) {
      formArray.controls.forEach((e: any, index) => {
        if (
          e.get('dHora').value != null &&
          formArray.at(index + 1) != undefined
        ) {
          if (
            e.get('dHora').value >= formArray.controls[index + 1].value.dHora
          ) {
            e.get('dHora').setErrors({ marksNotSequence: true });
          } else {
            e.get('dHora').setErrors(null);
          }
        }
      });
    }
    return null;
  }
}

export interface ValidationResult {
  [key: string]: boolean;
}
