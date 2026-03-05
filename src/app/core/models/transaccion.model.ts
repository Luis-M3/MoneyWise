export interface Transaccion {
  id: string;
  tipo: 'gasto' | 'ingreso';
  categoria: string;
  fecha: Date;
  monto: number;
  descripcion?: string;
  comprobante?: string; // base64 o ruta
}