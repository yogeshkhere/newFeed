import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allUserPost:any;
  previewLogo: any = null;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data=>{
      this.allUserPost = data

      var reader = new FileReader();      
      reader.readAsDataURL(this.allUserPost[0].image); 
      reader.onload = (_event) => { 
        this.previewLogo = reader.result; 
      }
    });
  }

}
