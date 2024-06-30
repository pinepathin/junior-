import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {ViewPostComponent} from "./components/view-post/view-post.component";
import {UpdatePostComponent} from "./components/update-post/update-post.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'post', component: CreatePostComponent },
  { path: 'post/:postId', component: ViewPostComponent},
  { path: 'update-post/:postId', component: UpdatePostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
