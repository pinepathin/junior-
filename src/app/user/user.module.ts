import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ViewPostComponent } from './components/view-post/view-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import {MatMenuModule} from "@angular/material/menu";
import {LightgalleryModule} from "lightgallery/angular";
import { PostCardComponent } from './components/post-card/post-card.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
  declarations: [
    DashboardComponent,
    CreatePostComponent,
    ViewPostComponent,
    UpdatePostComponent,
    PostCardComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatMenuModule,
        LightgalleryModule,
        SweetAlert2Module
    ]
})
export class UserModule { }
