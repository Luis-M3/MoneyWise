import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CATEGORIAS } from '../../../core/constants/categorias.constants';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false,
})
export class FilterBarComponent {
  @Input() tipoSeleccionado: string = 'todos';
  @Input() categoriaSeleccionada: string = 'todas';
  @Output() onTipoChange = new EventEmitter<string>();
  @Output() onCategoriaChange = new EventEmitter<string>();
  @Output() onBuscarChange = new EventEmitter<string>();

  categorias = CATEGORIAS;

  tipoChange(event: any) {
    this.onTipoChange.emit(event.detail.value);
  }

  categoriaChange(event: any) {
    this.onCategoriaChange.emit(event.detail.value);
  }

  buscarChange(event: any) {
    this.onBuscarChange.emit(event.detail.value || '');
  }
}
