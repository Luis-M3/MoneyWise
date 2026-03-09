import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  standalone: false,
})
export class DateFieldComponent {
  @Input() label: string = '';
  @Input() value: any = new Date().toISOString();
  @Input() error: string = '';
  @Output() onChange = new EventEmitter<any>();

  changed(event: any) {
    this.onChange.emit(event.detail.value);
  }
}