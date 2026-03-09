import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async login() {
    if (this.form.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Ingresando...' });
    await loading.present();

    const { email, password } = this.form.value;
    const ok = await this.auth.login(email, password);
    await loading.dismiss();

    if (ok) {
      this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Credenciales incorrectas. Verifica tu email y contraseña.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  irARegistro() {
    this.router.navigate(['/auth/register']);
  }
}
