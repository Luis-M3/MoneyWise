import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthName', standalone: false })
export class MonthNamePipe implements PipeTransform {
  private meses = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  transform(value: number): string {
    if (value < 1 || value > 12) return '';
    return this.meses[value - 1];
  }
}