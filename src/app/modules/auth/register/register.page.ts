import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, soloLetrasValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmar: ['', Validators.required]
    });
  }

  async registrar() {
    if (this.form.invalid) return;
    const { nombre, email, password, confirmar } = this.form.value;

    if (password !== confirmar) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Registrando...' });
    await loading.present();

    const ok = await this.auth.register(nombre, email, password);
    await loading.dismiss();

    if (ok) {
      this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El email ya está registrado.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  irALogin() {
    this.router.navigate(['/auth/login']);
  }

  
}

export function soloLetrasValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value || '';
    const valido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
    return valido ? null : { soloLetras: true };
  };
}
