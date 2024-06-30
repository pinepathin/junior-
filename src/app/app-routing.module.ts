import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  // import user module (who has user-routing.module) to Register user-routing-module in this main routing
  {path: "user", loadChildren:() => import("./user/user.module").then(m => m.UserModule)},
  {path: "chat/:user", component:ChatComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
