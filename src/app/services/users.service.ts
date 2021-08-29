import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  sendEmail(data: {
    subject: string;
    name: string;
    message: string;
    email: string;
  }) {
    return this.http.post(`${apiUrl}/users/sendEmail`, data);
  }
}
