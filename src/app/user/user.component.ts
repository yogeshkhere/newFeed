import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  addFeedForm : FormGroup
  imageName : string;
  image: any;
  userName: any;

  constructor(private fb:FormBuilder,private userService:UserService,private snackBar:MatSnackBar) {

    this.addFeedForm = this.fb.group({
      title :['',Validators.required],
      description : ['',Validators.required],
      // image :[null]
    });

   }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.currentUser).role
  }

  addPost(){
    if(this.addFeedForm.invalid){
      return
    }
    const postData = new FormData();
    postData.append('title',this.f.title.value)
    postData.append('description',this.f.title.value)
    postData.append('image',this.image)
    postData.append('username',this.userName)
    
    this.userService.addPostForm(postData).subscribe(data=>{
      console.log('Form Data saved ',data.message)
      this.addFeedForm.reset()
      this.snackBar.open('Your post has been saved ,When approved by admin will be visible on home screen ', "OK", {
        duration: 8000,
      });
    });
  }

  get f(){ return this.addFeedForm.controls }

  onImageChanged(event){
    let image = event.target.files[0]
    this.image =image
    this.imageName = image.name
  }

  cancelFile(){
    this.imageName = ''
    // this.f.image.setValue(null)
  }


}
