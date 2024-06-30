import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LightgalleryModule } from 'lightgallery/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChatComponent } from './chat/chat.component';
import { WebsocketService } from './web-socket.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    LightgalleryModule,
    BrowserAnimationsModule, // required animations module
    SweetAlert2Module.forRoot(),

  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
