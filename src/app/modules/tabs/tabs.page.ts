import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage {
  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: () => this.auth.logout()
        }
      ]
    });
    await alert.present();
  }
}
