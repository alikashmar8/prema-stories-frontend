import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { Product } from '../../../../models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  currentUser: User | null = null;
  isLoading: boolean = true;
  products: Product[] = [];
  search: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.authService.isAdmin()
      ? (this.currentUser = this.authService.currentUser)
      : this.router.navigate(['/']).then(() => {});
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getAll().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
      this.isLoading = false;
    });
  }
}
