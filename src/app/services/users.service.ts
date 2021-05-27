import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, combineAll } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL: string = 'http://localhost:4001/users';

  constructor(private client: HttpClient) { }

  getAllUsers() {
    return this.client.get(`${this.baseURL}`);
  }

  getUser(id) {
    return this.client.get(`${this.baseURL}/${id}`);
  }
  updateUser(id, user) {
    const payload = new HttpParams()
      .set('userName', user.userName)
      .set('email', user.email)
      .set('password', user.password)
      .set('gender', user.gender)
      .set('image', user.image);
    return this.client.patch(`${this.baseURL}/${id}`, payload);
  }
  deleteUser(id) {
    return this.client.delete(`${this.baseURL}/${id}`);
  }
  registerUser(user) {
    const payload = new HttpParams()
      .set('userName', user.userName)
      .set('email', user.email)
      .set('password', user.password)
      .set('gender', user.gender)
      .set('image', user.image);
    return this.client.post(`${this.baseURL}/signup`, payload);
  }
  uploadPhoto(id, profileImage: File) {
    const formData: FormData = new FormData();
    formData.append('image', profileImage, profileImage.name);

    return this.client.post(`${this.baseURL}/upload/profile/${id}`, formData);
  }
  loginUser(user) {
    const payload = new HttpParams()
      .set('email', user.email)
      .set('password', user.password);
    return this.client.post(`${this.baseURL}/login`, payload);
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return new JwtHelperService().decodeToken(token).user;
  }
}
