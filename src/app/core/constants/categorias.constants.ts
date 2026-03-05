import { Categoria } from '../models/categoria.model';

export const CATEGORIAS: Categoria[] = [
  { nombre: 'Alimentación', icono: 'restaurant', color: '#FF6B6B' },
  { nombre: 'Transporte',   icono: 'car',        color: '#4ECDC4' },
  { nombre: 'Vivienda',     icono: 'home',        color: '#45B7D1' },
  { nombre: 'Salud',        icono: 'medkit',      color: '#96CEB4' },
  { nombre: 'Ocio',         icono: 'game-controller', color: '#FFEAA7' },
  { nombre: 'Salario',      icono: 'cash',        color: '#6C5CE7' },
  { nombre: 'Otros',        icono: 'ellipsis-horizontal', color: '#A0A0A0' },
];

export const TIPOS_TRANSACCION = [
  { valor: 'gasto',   label: 'Gasto' },
  { valor: 'ingreso', label: 'Ingreso' },
];