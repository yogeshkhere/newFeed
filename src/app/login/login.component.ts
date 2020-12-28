import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRoleAdmin = false ;
  loginForm : FormGroup
  loginError:string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder,private authService:AuthenticationService,private router :Router) {
      this.loginForm = this.fb.group({
        userId :['',Validators.required],
        password : ['',Validators.required]
      });
     }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close()
  }
  changeUserRole(){
    this.userRoleAdmin = !this.userRoleAdmin
  }
  get f(){ return this.loginForm.controls}

  loginSubmit(){
    if(this.f.invalid){
      return
    }
    if(!this.userRoleAdmin){
      this.authService.loginUser(this.f.userId.value,this.f.password.value).subscribe(data=>{
        if(data){
          console.log("--------------User Logged in Successfuly-------------",data)
          this.dialogRef.close(true)
          this.router.navigateByUrl('/user');
        }
      },
      error => {
        this.loginError = error.error.message;
        console.log("--------------Error in User Login-------------",error.error.message)
    });
    }else{
      this.authService.loginAdmin(this.f.userId.value,this.f.password.value).subscribe(data=>{
        if(data){
          console.log("--------------Admin Logged in Successfuly-------------",data)
          this.dialogRef.close(true)
          this.router.navigateByUrl('/admin');
        }
      },
      error => {
        this.loginError = error.error.message;
        console.log("--------------Error in Admin Login-------------",error.error.message)
    });
    }

    
  }

}
