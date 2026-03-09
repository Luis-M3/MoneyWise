import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  standalone: false,
})
export class SelectFieldComponent {
  @Input() label: string = '';
  @Input() options: { valor: string, label: string }[] = [];
  @Input() value: any = '';
  @Input() error: string = '';
  @Output() onChange = new EventEmitter<any>();

  changed(event: any) {
    this.onChange.emit(event.detail.value);
  }
}