import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';  // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost/usuarios_pt/public/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post> {  // Utiliza la interfaz Post como tipo de retorno
    return this.http.get<Post>(this.apiUrl);
  }

  createPost(postData: { title: string; content: string; userid: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, postData);
  }
}
