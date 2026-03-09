import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() mensaje: string = 'No hay datos';
  @Input() icono: string = 'alert-circle-outline';
  @Input() accion: string = '';
  @Output() onAccion = new EventEmitter<void>();
}