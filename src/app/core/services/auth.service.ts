import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storage: StorageService, private router: Router) {}

  async init() {
    const user = await this.storage.get('currentUser');
    if (user) this.currentUserSubject.next(user);
  }

  async register(nombre: string, email: string, password: string): Promise<boolean> {
    const users: User[] = (await this.storage.get('users')) || [];
    const existe = users.find(u => u.email === email);
    if (existe) return false;

    const newUser: User = {
      id: Date.now().toString(),
      nombre,
      email,
      password,
      fechaRegistro: new Date()
    };

    users.push(newUser);
    await this.storage.set('users', users);
    await this.storage.set('currentUser', newUser);
    this.currentUserSubject.next(newUser);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    if (!email || !password) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const users: User[] = (await this.storage.get('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;

    await this.storage.set('currentUser', user);
    this.currentUserSubject.next(user);
    return true;
  }

  async logout() {
    await this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
