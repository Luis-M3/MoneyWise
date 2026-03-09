import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat', standalone: false })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, simbolo: string = '$'): string {
    if (isNaN(value)) return `${simbolo}0.00`;
    return `${simbolo}${value.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}