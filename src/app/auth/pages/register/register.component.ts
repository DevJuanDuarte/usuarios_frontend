// TypeScript: RegisterComponent.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validador para comprobar si las contraseñas coinciden
  private passwordMatchValidator(group: FormGroup): null | object {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para registrar el usuario
  register(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register({ name, email, password }).subscribe(
        (user) => {
          this.errorMessage = null;
          this.router.navigate(['/auth/login']);
          console.log('Registro exitoso');
          alert('Usuario creado exitosamente!');
        },
        (error) => {
          // Captura el mensaje de error específico desde la respuesta del servidor
          this.errorMessage = error.error.message || 'Error al registrar el usuario.';
          console.error('Error al registrar:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete correctamente todos los campos.';
    }
  }
}
