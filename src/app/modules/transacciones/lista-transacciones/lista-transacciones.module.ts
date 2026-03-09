import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTransaccionesPage } from './lista-transacciones.page';
import { SharedModule } from '../../../shared/shared-module';
import { FormularioTransaccionModule } from '../formulario-transaccion/formulario-transaccion.module';

const routes: Routes = [{ path: '', component: ListaTransaccionesPage }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FormularioTransaccionModule
  ],
  declarations: [ListaTransaccionesPage]
})
export class ListaTransaccionesPageModule {}