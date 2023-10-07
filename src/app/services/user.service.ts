import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from 'src/User';
import {Observable} from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:5000/users'

  GetUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  DeleteUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`
    return this.http.delete<User>(url)
  }

  AddUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions)
  }

  UpdateUser(user: User, id:number): Observable<User>{
    return this.http.put<User>('http://localhost:5000/users/'+id, user, httpOptions)
  }

}
