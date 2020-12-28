import { Injectable } from '@angular/core';
import {  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        public dialog: MatDialog,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so open login popup
        const dailog = this.dialog.open( LoginComponent, {
            height: '400px',
            width : '600px'
          });
        
        return false;
    }
}