import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false,
})
export class TransactionItemComponent {
  @Input() transaccion!: Transaccion;
  @Output() onClick = new EventEmitter<string>();

  clicked() {
    this.onClick.emit(this.transaccion.id);
  }
}