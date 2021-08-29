import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  currentUser: User | null;
  isLoading: boolean;
  products: Product[];
  allProducts: Product[];
  search: string;
  categories: Category[] = [];
  searchCategory: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
 ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getAll().subscribe((res: any) => {
      this.products = res;
      this.allProducts = res;
      this.categoriesService.getAll().subscribe((res: any) => {
        this.categories = res;
        this.isLoading = false;
      });
    });
  }


  filterByCategory() {
    console.log(this.allProducts);
    if (this.searchCategory > 0) {
      this.products = this.allProducts.filter((product) => {
        if (product.category_id == this.searchCategory) {
          return product;
        }
      });
    } else {
      this.products = this.allProducts;
    }
  }

}
