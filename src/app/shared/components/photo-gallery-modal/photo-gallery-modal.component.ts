import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-gallery-modal',
  templateUrl: './photo-gallery-modal.component.html',
  styleUrls: ['./photo-gallery-modal.component.scss'],
  standalone: false,
})
export class PhotoGalleryModalComponent {
  @Input() fotos: string[] = [];
  @Input() fotoInicial: number = 0;
  fotoActual: number = 0;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.fotoActual = this.fotoInicial;
  }

  anterior() {
    if (this.fotoActual > 0) this.fotoActual--;
  }

  siguiente() {
    if (this.fotoActual < this.fotos.length - 1) this.fotoActual++;
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}