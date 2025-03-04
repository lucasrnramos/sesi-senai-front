import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  private _insertComma(input: string): string {
    input = input ? input : '0';
    input = input.replace('.', ',');
    input = (input.includes(',') && input.split(',')[1].length == 1) ? `${input}0` : input;
    input = (input.includes(',') || input.includes('.')) ? input.replace(/[.,]/g, '') : `${input}00`;
    const LENG = input.length;
    return (LENG <= 2) ? `0.${input.padStart(2, '0')}` : input.slice(0, LENG - 2) + '.' + input.slice(LENG - 2);
  }

  public strToNumber(input: string): number {
    input = input ?? '0';
    input = (input.includes(',') && input.includes('.')) ? input.replace('.', '') : input;
    input = input.replace(',', '.');
    return parseFloat(input);
  }

  public formatNumber(input: string): string {
    const NUMBER = parseFloat(this._insertComma(input));
    const FORMATTED_NUMBER = NUMBER.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    return FORMATTED_NUMBER;
  }

  private _insertInputComma(input: string): string {
    input = input ? input : '0';
    input = input.replace(/[.,]/g, '');
    const LENG = input.length;
    return (LENG <= 2) ? `0.${input.padStart(2, '0')}` : input.slice(0, LENG - 2) + '.' + input.slice(LENG - 2);
  }

  public formatInputNumber(input: string): string {
    const NUMBER = parseFloat(this._insertInputComma(input));
    const FORMATTED_NUMBER = NUMBER.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    return FORMATTED_NUMBER;
  }

  public formatDate(input: string): string {
    const REGEX_ARR = [/\w{4}-\w{2}-\w{2}\s\d{2}:\w{2}:\w{2}/, /\w{4}-\w{2}-\w{2}/ ];
    const EXTRACTION_REGEX = /(\w{4}-\w{2}-\w{2})/;
    const MATCHING = REGEX_ARR.some(regex => regex.test(input));

    const NEW_INPUT = MATCHING ? input.match(EXTRACTION_REGEX)![0].split('-').reverse().join('/') : input;
    return NEW_INPUT;
  }

  public formatCPF(input: string): string {
    input = input.split('.').join('').split('-').join('');

    if(Number(input)) {
      input = input.padStart(11, '0');
      const EXTRACTION_REGEX = /(\w{3})(\w{3})(\w{3})(\w{2})/;
      const VALUES = input.match(EXTRACTION_REGEX)?.slice(1);

      return `${VALUES![0]}.${VALUES![1]}.${VALUES![2]}-${VALUES![3]}`;
    } else {
      return '';
    }
  }

  // public formatInputCPF(input: string): string {
  //   const INPUT = input.split('.').join('').split('-').join('');

  //   return this.formatCPF(INPUT);
  // }

  public formatCNPJ(input: string): any {
    if(Number(input)) {
      input = input.padStart(14, '0');
      const EXTRACTION_REGEX = /(\w{2})(\w{3})(\w{3})(\w{4})(\w{2})/;
      const VALUES = input.match(EXTRACTION_REGEX)?.slice(1);

      return `${VALUES![0]}.${VALUES![1]}.${VALUES![2]}/${VALUES![3]}-${VALUES![4]}`;
    } else {
      return '';
    }
  }
}
