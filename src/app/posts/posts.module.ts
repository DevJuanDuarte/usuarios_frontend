import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { PostComponent } from './pages/post/post.component';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    PostComponent,
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
