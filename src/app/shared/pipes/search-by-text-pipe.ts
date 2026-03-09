import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../../core/models/transaccion.model';

@Pipe({ name: 'searchByText', standalone: false })
export class SearchByTextPipe implements PipeTransform {
  transform(transacciones: Transaccion[], texto: string): Transaccion[] {
    if (!transacciones || !texto?.trim()) return transacciones;
    const busqueda = texto.toLowerCase();
    return transacciones.filter(t =>
      t.descripcion?.toLowerCase().includes(busqueda) ||
      t.categoria.toLowerCase().includes(busqueda)
    );
  }
}