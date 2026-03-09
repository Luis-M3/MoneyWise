import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormularioTransaccionModal } from './formulario-transaccion.modal';

@NgModule({
  imports: [SharedModule],
  declarations: [FormularioTransaccionModal],
  exports: [FormularioTransaccionModal]
})
export class FormularioTransaccionModule {}