import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

import {StorageService} from "./services/auth-service/storage.service";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'junior-oasis-frontend';
  isUserLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit() {
    initFlowbite();
    //this.updateUserLoggedInStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedInStatus();
      }
    })
    if(!this.isUserLoggedIn) {
    this.router.navigateByUrl('/login');
  }  
  }

  //TODO
  private updateUserLoggedInStatus(): void {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  //TODO fix logout
  logout() {
    StorageService.logout();
    window.location.href = "/login"
    //this.router.navigateByUrl("/login")
  }


}
