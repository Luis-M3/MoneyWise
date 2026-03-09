import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/categorias.constants';

@Pipe({ name: 'categoryColor', standalone: false })
export class CategoryColorPipe implements PipeTransform {
  transform(categoria: string): string {
    return CATEGORIAS.find(c => c.nombre === categoria)?.color || '#7DA0CA';
  }
}