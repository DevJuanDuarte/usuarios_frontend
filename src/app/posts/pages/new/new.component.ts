import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent {

  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const currentUser = this.authService.getLoggedInUser();
      
      if (!currentUser) {
        console.error('No hay usuario autenticado');
        this.router.navigate(['/auth/login']);
        return;
      }

      const postData = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        userid: currentUser.id // Ahora accedemos directamente al id del usuario
      };

      this.postService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post creado exitosamente:', response);
          this.router.navigateByUrl('/posts/list');
        },
        error: (error) => {
          console.error('Error al crear el post:', error);
        }
      });
    }
  }
}