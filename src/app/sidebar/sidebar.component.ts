import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  private userSub !: Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userSub =  this.authService.user.subscribe(user=>{ 
      this.isAuthenticated= !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }
ngOnDestroy(): void {
  this.userSub.unsubscribe();
}
}
