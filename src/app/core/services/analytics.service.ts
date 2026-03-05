import { Injectable } from '@angular/core';
import { Transaccion } from '../models/transaccion.model';
import { ResumenFinanciero } from '../models/resumen-financiero.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  calcularResumen(transacciones: Transaccion[]): ResumenFinanciero {
    const ahora = new Date();
    const delMes = transacciones.filter(t => {
      const fecha = new Date(t.fecha);
      return fecha.getMonth() === ahora.getMonth() &&
             fecha.getFullYear() === ahora.getFullYear();
    });

    const totalIngresos = delMes
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + t.monto, 0);

    const totalGastos = delMes
      .filter(t => t.tipo === 'gasto')
      .reduce((sum, t) => sum + t.monto, 0);

    const gastosPorCategoria = this.agruparPorCategoria(
      delMes.filter(t => t.tipo === 'gasto'),
      totalGastos
    );

    return {
      saldoActual: totalIngresos - totalGastos,
      totalIngresosMes: totalIngresos,
      totalGastosMes: totalGastos,
      gastosPorCategoria
    };
  }

  private agruparPorCategoria(gastos: Transaccion[], total: number) {
    const mapa: { [key: string]: number } = {};
    gastos.forEach(t => {
      mapa[t.categoria] = (mapa[t.categoria] || 0) + t.monto;
    });
    return Object.entries(mapa).map(([categoria, monto]) => ({
      categoria,
      monto,
      porcentaje: total > 0 ? (monto / total) * 100 : 0
    }));
  }
}
