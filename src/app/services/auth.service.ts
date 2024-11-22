import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Usuario } from '../interfaces/users.interface';

interface LoginResponse {
  status: number;
  message: string;
  data?: {
    user: Usuario;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar el usuario almacenado al iniciar el servicio
    const storedUser = this.getCurrentUser();
    if (storedUser && 'id' in storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  register(user: { name: string; email: string; password: string }): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost/usuarios_pt/public/api/register', user).pipe(
      tap((response) => {
        console.log('Usuario registrado exitosamente:', response);
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(error); // Lanza el error para que pueda ser manejado en el componente
      })
    );
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<LoginResponse>('http://localhost/usuarios_pt/public/api/login', { email, password }).pipe(
      map(response => {
        if (response.status === 200 && response.data?.user) {
          const user = response.data.user;
          console.log('Usuario procesado:', user); // Para debugging
          this.setCurrentUser(user);
          return user;
        }
        throw new Error(response.message || 'Error de autenticación');
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const user = this.getLoggedInUser();
    return !!user && 'id' in user; // Verifica que sea un usuario válido
  }

  getLoggedInUser(): Usuario | null {
    return this.getCurrentUser();
  }

  private getCurrentUser(): Usuario | null {
    const usuario = localStorage.getItem('currentUser');
    if (!usuario) return null;
    
    const parsedUser = JSON.parse(usuario);
    // Verificar que sea un usuario válido y no un mensaje de error
    return 'id' in parsedUser ? parsedUser : null;
  }

  private setCurrentUser(usuario: Usuario | null): void {
    if (usuario && 'id' in usuario) {
      this.currentUserSubject.next(usuario);
      localStorage.setItem('currentUser', JSON.stringify(usuario));
    } else {
      this.currentUserSubject.next(null);
      localStorage.removeItem('currentUser');
    }
  }

  
}