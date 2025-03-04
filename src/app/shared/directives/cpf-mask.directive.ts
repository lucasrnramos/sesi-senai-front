import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  constructor(private _element: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const value = event.target.value.replace(/\D/g, '') as string;
    let formatted = value.substring(0, 11);

    if (value.length > 3) {
      formatted = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 6) {
      formatted = formatted.substring(0, 7) + '.' + formatted.substring(7);
    }
    if (value.length > 9) {
      formatted = formatted.substring(0, 11) + '-' + formatted.substring(11, 13);
    }

    event.target.value = formatted;
  }
}
