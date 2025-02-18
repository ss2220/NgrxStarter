import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user'
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  toFetchUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`)
    .pipe(map((res: User[]) => {
      return res.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isEditable: false
      }));
    }))
  }

  toUpdateUser(id: number, data: User){
    return this.http.patch<User[]>(`${this.apiUrl}/${id}`, data);
  }
    

  
}

