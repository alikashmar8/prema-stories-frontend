import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constants';
import { setHeaders } from 'src/methods/methods';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  access_token: string = '';

  constructor(private authService: AuthService, private http: HttpClient) {
    if (authService.currentUser?.access_token)
      this.access_token = authService.currentUser.access_token;
  }

  getAll() {
    return this.http.get(`${apiUrl}/categories`);
  }

  store(data: { name: string; description?: string }) {
    return this.http.post(
      `${apiUrl}/categories`,
      data,
      setHeaders(this.access_token)
    );
  }

  delete(id: string) {
    return this.http.delete(
      `${apiUrl}/categories/${id}`,
      setHeaders(this.access_token)
    );
  }

  getById(id: string) {
    return this.http.get(`${apiUrl}/categories/${id}`);
  }

  update(id: string, data: { name: string; description?: string }) {
    return this.http.put(
      `${apiUrl}/categories/${id}`,
      data,
      setHeaders(this.access_token)
    );
  }
}
