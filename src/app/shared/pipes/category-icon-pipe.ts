import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIAS } from '../../core/constants/categorias.constants';

@Pipe({ name: 'categoryIcon', standalone: false })
export class CategoryIconPipe implements PipeTransform {
  transform(categoria: string): string {
    return CATEGORIAS.find(c => c.nombre === categoria)?.icono || 'ellipsis-horizontal';
  }
}