import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constants';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  currentUser: User | null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUser = authService.currentUser;
  }

  getAll() {
    return this.http.get(`${apiUrl}/products`);
  }

  getLatestProducts() {
    return this.http.get(`${apiUrl}/products/getLatestProducts`);
  }

  store(data: any) {
    return this.http.post(`${apiUrl}/products`, data);
  }

  getById(id: string) {
    return this.http.get(`${apiUrl}/products/${id}`);
  }

  update(id: string, data: any) {
    return this.http.post(`${apiUrl}/products/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/products/${id}`);
  }

  searchByName(searchText: string) {
    return this.http.get(`${apiUrl}/products/search?search=${searchText}`);
  }

  getProductsByNumber(number: number) {
    return this.http.get(`${apiUrl}/products/count/${number}`);
  }
}
