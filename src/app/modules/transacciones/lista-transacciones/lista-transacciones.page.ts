import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Transaccion } from '../../../core/models/transaccion.model';
import { TransaccionService } from '../../../core/services/transaccion.service';
import { CATEGORIAS } from '../../../core/constants/categorias.constants';
import { FormularioTransaccionModal } from '../formulario-transaccion/formulario-transaccion.modal';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit, OnDestroy {
  transacciones: Transaccion[] = [];
  transaccionesFiltradas: Transaccion[] = [];
  categorias = CATEGORIAS;

  filtroTipo: string = 'todos';
  filtroCategoria: string = 'todas';
  textoBusqueda: string = '';

  private sub!: Subscription;

  constructor(
    private transaccionService: TransaccionService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.sub = this.transaccionService.transacciones$.subscribe(data => {
      this.transacciones = [...data].sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      this.aplicarFiltros();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  aplicarFiltros() {
    let resultado = [...this.transacciones];

    if (this.filtroTipo !== 'todos') {
      resultado = resultado.filter(t => t.tipo === this.filtroTipo);
    }

    if (this.filtroCategoria !== 'todas') {
      resultado = resultado.filter(t => t.categoria === this.filtroCategoria);
    }

    if (this.textoBusqueda.trim()) {
      const texto = this.textoBusqueda.toLowerCase();
      resultado = resultado.filter(t =>
        t.descripcion?.toLowerCase().includes(texto)
      );
    }

    this.transaccionesFiltradas = resultado;
  }

  onTipoChange(event: any) {
    this.filtroTipo = event.detail.value;
    this.aplicarFiltros();
  }

  onCategoriaChange(event: any) {
    this.filtroCategoria = event.detail.value;
    this.aplicarFiltros();
  }

  onBusquedaChange(event: any) {
    this.textoBusqueda = event.detail.value || '';
    this.aplicarFiltros();
  }

  verDetalle(id: string) {
    this.router.navigate(['/tabs/transacciones/detalle', id]);
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: FormularioTransaccionModal
    });
    await modal.present();
  }

  getColorCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.color || '#7DA0CA';
  }

  getIconoCategoria(nombre: string): string {
    return this.categorias.find(c => c.nombre === nombre)?.icono || 'ellipsis-horizontal';
  }
}
