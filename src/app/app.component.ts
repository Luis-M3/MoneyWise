import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';
import { TransaccionService } from './core/services/transaccion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private auth: AuthService,
    private transacciones: TransaccionService
  ) {}

  async ngOnInit() {
    await this.storage.init();
    await this.auth.init();
    await this.transacciones.init();
  }
}
