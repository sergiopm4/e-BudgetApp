import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public _http: HttpClient) { }

  url: string = 'http://localhost:3000';

  //CRUD User.
  register(user: User) {
    return this._http.post(`${this.url}/register`, user);
  }

  login(user: User) {
    return this._http.post(`${this.url}/login`, user);
  }
}
