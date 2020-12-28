import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient) { }

  addPostForm(formData){
   return this.http.post<any>(`/users/addPostUser`,{"formData":formData})
  }

  getAllUser() {
    return this.http.get<User[]>(`/users/getAllUser`);
  }

  adminAction( username , actionType , rejectionMessage){
    return this.http.post('/admin/actionType',{ "username": username , "actionType" : actionType , "rejectionMessage": rejectionMessage })
  }
 
}
