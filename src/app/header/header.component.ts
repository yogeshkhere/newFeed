import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean =false;
  userRole: any;

  constructor(public dialog: MatDialog,private authService : AuthenticationService,private router :Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userRole = JSON.parse(localStorage.currentUser).role
    console.log(this.userRole);
    
  }
  
  login(){
   const dailog = this.dialog.open( LoginComponent, {
      height: '400px',
      width : '600px'
    });
    dailog.afterClosed().subscribe(result=>{
      if(result){
        this.isLoggedIn = this.authService.isAuthenticated();
        this.userRole = JSON.parse(localStorage.currentUser).role 
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.isLoggedIn = this.authService.isAuthenticated();
    // this.userRole = JSON.parse(localStorage.currentUser).role
}


}
