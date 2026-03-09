import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CameraService } from '../../../core/services/camera.service';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone: false,
})
export class PhotoSelectorComponent {
  @Input() fotoActual: string | null = null;
  @Output() onFotoSeleccionada = new EventEmitter<string>();
  @Output() onFotoEliminada = new EventEmitter<void>();

  constructor(private cameraService: CameraService) {}

  async tomarFoto() {
    const foto = await this.cameraService.tomarFoto();
    if (foto) {
      this.fotoActual = foto;
      this.onFotoSeleccionada.emit(foto);
    }
  }

  async seleccionarGaleria() {
    const foto = await this.cameraService.seleccionarDeGaleria();
    if (foto) {
      this.fotoActual = foto;
      this.onFotoSeleccionada.emit(foto);
    }
  }

  eliminarFoto() {
    this.fotoActual = null;
    this.onFotoEliminada.emit();
  }
}
