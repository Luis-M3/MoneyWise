import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.scss'],
  standalone: false,
})
export class CategoryBadgeComponent {
  @Input() categoria: string = '';
  @Input() mostrarIcono: boolean = true;
}