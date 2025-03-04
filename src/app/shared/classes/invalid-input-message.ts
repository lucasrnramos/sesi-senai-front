import { Injectable } from "@angular/core";
import { AbstractControl, FormArray } from "@angular/forms";

@Injectable()
export class InputValidator {
  public hasError(control: AbstractControl | FormArray | null | undefined): boolean {
    return (((control?.invalid && control?.touched) ||
            (control?.dirty && control?.touched))
            &&
            (control?.hasError('emailMismatch') ||
            control?.hasError('allDigitsMustBeFilledIn') ||
            control?.hasError('passwordMismatch') ||
            control?.hasError('invalidRange') ||
            control?.hasError('minOneItem') ||
            control?.hasError('dateOneYearAgo') ||
            control?.hasError('required') ||
            control?.hasError('minlength') ||
            control?.hasError('maxlength') ||
            control?.hasError('pattern') ||
            control?.hasError('email') ||
            control?.hasError('min') ||
            control?.hasError('max'))) ?? false;
  }

  public getErrorMessage(control: AbstractControl | FormArray | null | undefined): string | null {
    if((control?.invalid && control?.touched) || (control?.dirty && control?.touched)){
      if (control?.hasError('emailMismatch')) {
        return `Os email deve ser igual nos dois campos`;
      } else if (control?.hasError('allDigitsMustBeFilledIn')) {
        return `Todos os dígitos devem ser preenchidos`;
      } else if (control?.hasError('passwordMismatch')) {
        return `As senhas devem ser iguais`;
      } else if (control?.hasError('invalidRange')) {
        return `Intervalo inválido`;
      } else if (control?.hasError('minOneItem')) {
        return `É necessário incluir pelo menos um procedimento`;
      } else if (control?.hasError('dateOneYearAgo')) {
        return `Não são aceitas notas com mais 365 dias`;
      } else if (control?.hasError('required')) {
        return 'Campo obrigatório';
      } else if (control?.hasError('minlength')) {
        return `O tamanho mínimo é ${control?.errors?.['minlength'].requiredLength}`;
      } else if (control?.hasError('maxlength')) {
        return `O tamanho máximo é ${control?.errors?.['maxlength'].requiredLength}`;
      } else if (control?.hasError('pattern')) {
        return 'Formato inválido';
      } else if (control?.hasError('email')) {
        return 'Endereço de email inválido';
      } else if (control?.hasError('min')) {
        return `O valor mínimo é ${control?.errors?.['min'].min}`;
      } else if (control?.hasError('max')) {
        return `O valor máximo é ${control?.errors?.['max'].max}`;
      }
      return '';
    }
    return '';
  }
}
