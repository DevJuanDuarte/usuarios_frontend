import { Component } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: this.passwordMatchValidator
  } as AbstractControlOptions);

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Validador para comprobar si las contraseñas coinciden
  private passwordMatchValidator(group: FormGroup): null | object {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para registrar el usuario
  register(): void {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')?.value ?? '';
      const email = this.registerForm.get('email')?.value ?? '';
      const password = this.registerForm.get('password')?.value ?? '';

      this.authService.register({ name, email, password }).subscribe({
        next: (user) => {
          this.errorMessage = null;  // Limpia el mensaje de error si el registro es exitoso
          this.router.navigate(['/auth/login']);
          console.log('Registro exitoso');
          alert('Usuario creado exitosamente!');
        },
        error: (error) => {
          // Captura el mensaje de error específico desde la respuesta del servidor
          if (error.status === 400 && error.error.message === 'El correo electrónico ya está registrado.') {
            this.errorMessage = 'El correo electrónico ya está registrado.';
          } else {
            this.errorMessage = 'Error al registrar el usuario.';
          }
          console.error('Error al registrar:', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete correctamente todos los campos.';
    }
  }
}
