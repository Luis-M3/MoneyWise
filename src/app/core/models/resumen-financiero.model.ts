export interface ResumenFinanciero {
  saldoActual: number;
  totalGastosMes: number;
  totalIngresosMes: number;
  gastosPorCategoria: {
    categoria: string;
    monto: number;
    porcentaje: number;
  }[];
}