import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  public transacciones$ = this.transaccionesSubject.asObservable();

  constructor(private storage: StorageService) {}

  async init() {
    const data = await this.storage.get('transacciones');
    this.transaccionesSubject.next(data || []);
  }

  async agregar(t: Omit<Transaccion, 'id'>): Promise<void> {
    const nueva: Transaccion = { ...t, id: Date.now().toString() };
    const lista = [...this.transaccionesSubject.value, nueva];
    await this.guardar(lista);
  }

  async editar(t: Transaccion): Promise<void> {
    const lista = this.transaccionesSubject.value.map(x => x.id === t.id ? t : x);
    await this.guardar(lista);
  }

  async eliminar(id: string): Promise<void> {
    const lista = this.transaccionesSubject.value.filter(x => x.id !== id);
    await this.guardar(lista);
  }

  getById(id: string): Transaccion | undefined {
    return this.transaccionesSubject.value.find(x => x.id === id);
  }

  private async guardar(lista: Transaccion[]) {
    await this.storage.set('transacciones', lista);
    this.transaccionesSubject.next(lista);
  }
}
