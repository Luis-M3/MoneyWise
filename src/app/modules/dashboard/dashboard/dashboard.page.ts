import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { ResumenFinanciero } from '../../../core/models/resumen-financiero.model';
import { User } from '../../../core/models/user.model';
import { CATEGORIAS } from '../../../core/constants/categorias.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, OnDestroy {
  resumen: ResumenFinanciero = {
    saldoActual: 0,
    totalIngresosMes: 0,
    totalGastosMes: 0,
    gastosPorCategoria: []
  };
  usuario: User | null = null;
  categorias = CATEGORIAS;
  private sub!: Subscription;

  constructor(
    private auth: AuthService,
    private transaccionService: TransaccionService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    this.usuario = this.auth.getCurrentUser();
    this.sub = this.transaccionService.transacciones$.subscribe(transacciones => {
      this.resumen = this.analytics.calcularResumen(transacciones);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getColorCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.color || '#7DA0CA';
  }

  getIconoCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.icono || 'ellipsis-horizontal';
  }

  ionViewWillEnter() {
    this.usuario = this.auth.getCurrentUser();
  }
}
