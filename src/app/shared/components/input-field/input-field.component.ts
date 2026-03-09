import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  standalone: false,
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: any = '';
  @Input() error: string = '';
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<any>();

  changed(event: any) {
    this.onChange.emit(event.detail.value);
  }
}