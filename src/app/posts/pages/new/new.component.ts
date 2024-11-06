import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importa Router
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: ``
})
export class NewComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router  // Inyecta Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        userid: 25  // Valor fijo para userid
      };

      this.postService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post creado exitosamente:', response);
          // Redirige a la lista de posts después de crear el post
          this.router.navigate(['/posts/list']);
        },
        error: (error) => {
          console.error('Error al crear el post:', error);
        }
      });
    }
  }
}
