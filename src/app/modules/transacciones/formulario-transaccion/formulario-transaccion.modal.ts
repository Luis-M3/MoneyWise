import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Transaccion } from '../../../core/models/transaccion.model';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { CameraService } from '../../../core/services/camera.service';
import { CATEGORIAS, TIPOS_TRANSACCION } from '../../../core/constants/categorias.constants';

@Component({
  selector: 'app-formulario-transaccion',
  templateUrl: './formulario-transaccion.modal.html',
  styleUrls: ['./formulario-transaccion.modal.scss'],
  standalone: false,
})
export class FormularioTransaccionModal implements OnInit {
  @Input() transaccion?: Transaccion;

  form!: FormGroup;
  categorias = CATEGORIAS;
  tipos = TIPOS_TRANSACCION;
  fotoActual: string | null = null;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private transaccionService: TransaccionService,
    private cameraService: CameraService
  ) {}

  ngOnInit() {
    this.modoEdicion = !!this.transaccion;
    this.fotoActual = this.transaccion?.comprobante || null;

    this.form = this.fb.group({
      tipo:        [this.transaccion?.tipo || 'gasto', Validators.required],
      categoria:   [this.transaccion?.categoria || '', Validators.required],
      fecha:       [this.transaccion?.fecha
                    ? new Date(this.transaccion.fecha).toISOString()
                    : new Date().toISOString(), Validators.required],
      monto:       [this.transaccion?.monto || '', [Validators.required, Validators.min(0.01)]],
      descripcion: [this.transaccion?.descripcion || '']
    });
  }

  async tomarFoto() {
    const foto = await this.cameraService.tomarFoto();
    if (foto) this.fotoActual = foto;
  }

  async seleccionarGaleria() {
    const foto = await this.cameraService.seleccionarDeGaleria();
    if (foto) this.fotoActual = foto;
  }

  eliminarFoto() {
    this.fotoActual = null;
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = {
      ...this.form.value,
      fecha: new Date(this.form.value.fecha),
      monto: parseFloat(this.form.value.monto),
      comprobante: this.fotoActual || undefined
    };

    if (this.modoEdicion && this.transaccion) {
      await this.transaccionService.editar({ ...datos, id: this.transaccion.id });
    } else {
      await this.transaccionService.agregar(datos);
    }

    await this.modalCtrl.dismiss({ guardado: true });
  }

  async cancelar() {
    await this.modalCtrl.dismiss();
  }
}
