import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent implements OnInit {

  posts: any[] = [];  // Almacena los datos de los posts

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (response) => {
        this.posts = response.data;  // Asigna los datos de los posts
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
}
