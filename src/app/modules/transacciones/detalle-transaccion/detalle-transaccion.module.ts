import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTransaccionPage } from './detalle-transaccion.page';
import { SharedModule } from '../../../shared/shared-module';
import { FormularioTransaccionModule } from '../formulario-transaccion/formulario-transaccion.module';

const routes: Routes = [{ path: '', component: DetalleTransaccionPage }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FormularioTransaccionModule
  ],
  declarations: [DetalleTransaccionPage]
})
export class DetalleTransaccionPageModule {}