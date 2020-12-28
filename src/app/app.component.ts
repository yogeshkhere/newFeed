import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(){
    // let users = [{"firstName":"yogesh","lastName":"khere","username":"user","password":"user","id":1,"postStatus":"Pending For Approval","title":"abc","description":"abc","image":"null"}]
    let users=[{"firstName":"yogesh","lastName":"khere","username":"user","password":"user","id":1,"role":"user"}]
    let admin = [{"firstName":"yogesh","lastName":"khere","username":"admin","password":"admin","id":1,"role":"admin"}]
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('admin', JSON.stringify(admin));
  }
}
