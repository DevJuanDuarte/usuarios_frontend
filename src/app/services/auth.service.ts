// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/users.interface'; // Ajusta la importación al tipo adecuado

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost/usuarios_pt/public/api/login', { email, password }).pipe(
      tap((usuario) => {
        this.setCurrentUser(usuario); // Aquí guardamos todo el objeto Usuario
      })
    );
  }

  logout(): void {
    this.setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }

  getLoggedInUser(): Usuario | null {
    return this.getCurrentUser();
  }

  private setCurrentUser(usuario: Usuario | null): void {
    this.currentUserSubject.next(usuario);
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  private getCurrentUser(): Usuario | null {
    const usuario = localStorage.getItem('currentUser');
    return usuario ? JSON.parse(usuario) : null;
  }
}
