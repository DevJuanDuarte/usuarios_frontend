// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost/usuarios_pt/public/api/login', { email, password }).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      })
    );
  }

  logout(): void {
    this.setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  private setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}