import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Transaccion } from '../../../core/models/transaccion.model';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { CATEGORIAS } from '../../../core/constants/categorias.constants';
import { FormularioTransaccionModal } from '../formulario-transaccion/formulario-transaccion.modal';

@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
  standalone: false
})
export class DetalleTransaccionPage implements OnInit {
  transaccion?: Transaccion;
  categorias = CATEGORIAS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transaccionService: TransaccionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transaccion = this.transaccionService.getById(id);
    }
    if (!this.transaccion) {
      this.router.navigate(['/tabs/transacciones']);
    }
  }

  getColorCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.color || '#7DA0CA';
  }

  getIconoCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.icono || 'ellipsis-horizontal';
  }

  async editar() {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModal,
      componentProps: { transaccion: this.transaccion }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.guardado) {
      const id = this.transaccion!.id;
      this.transaccion = this.transaccionService.getById(id);
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Transacción',
      message: '¿Estás seguro? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.transaccionService.eliminar(this.transaccion!.id);
            this.router.navigate(['/tabs/transacciones']);
          }
        }
      ]
    });
    await alert.present();
  }

  volver() {
    this.router.navigate(['/tabs/transacciones']);
  }
}