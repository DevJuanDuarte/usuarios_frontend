import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { Post } from '../../../interfaces/post.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importa FormBuilder y FormGroup
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent {
  postForm: FormGroup;  // Define la propiedad postForm

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder,  // Inyecta FormBuilder en el constructor
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const currentUser = this.authService.getLoggedInUser();
      
      // Solo pasamos las propiedades necesarias para crear el post
      const postData = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        userid: currentUser?.data.user.id || 0, // Obtén el id del usuario logueado
      };

      this.postService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post creado exitosamente:', response);
          // Aquí puedes redirigir a otra página o mostrar un mensaje
          
          this.router.navigateByUrl('/posts/list');

        },
        error: (error) => {
          console.error('Error al crear el post:', error);
        }
      });
    }
  }
}
