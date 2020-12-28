import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allAdminPost: any;
  rejectMessage : any ;
  previewLogo: any = null;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data=>{
      console.log('-------------- Post Requested ------------->',data)
      this.allAdminPost = data

      var reader = new FileReader();      
      reader.readAsDataURL(this.allAdminPost[0].image); 
      reader.onload = (_event) => { 
        this.previewLogo = reader.result; 
      }
    });
  }

  adminAction(actionType,userName){
    if(actionType=="approved"){
      this.rejectMessage = null
    }
      this.userService.adminAction(userName,actionType,this.rejectMessage).subscribe(data=>{
        console.log('Admin Action Updated',data)
      });
    }
  

}
