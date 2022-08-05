import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy{
   isAuthenticated = false;
   flashMessage:any;
  private userSub !: Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {

  this.userSub =  this.authService.user.subscribe(user=>{ 
    this.isAuthenticated= !!user;
    console.log(!user);
    console.log(!!user);
  });
  }
ngOnDestroy(): void {
    this.userSub.unsubscribe();
}

onLogout() {
  this.authService.logout();
}
}
