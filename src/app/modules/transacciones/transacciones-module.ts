import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./lista-transacciones/lista-transacciones.module')
        .then(m => m.ListaTransaccionesPageModule)
  },
  {
    path: 'detalle/:id',
    loadChildren: () =>
      import('./detalle-transaccion/detalle-transaccion.module')
        .then(m => m.DetalleTransaccionPageModule)
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class TransaccionesModule {}