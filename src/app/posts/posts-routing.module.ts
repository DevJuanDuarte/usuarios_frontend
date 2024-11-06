// post-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { PostComponent } from './pages/post/post.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'new', component: NewComponent, canActivate: [AuthGuard] },
      { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
      { path: ':id', component: PostComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }