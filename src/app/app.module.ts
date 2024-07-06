import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './chat/chat.component';
import {HttpClientModule} from "@angular/common/http";
import { LightgalleryModule } from 'lightgallery/angular';
import { LoginComponent } from './components/auth/login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import { NgModule } from '@angular/core';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
