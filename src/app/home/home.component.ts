import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean;
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProductsByNumber(4).subscribe((res: any)=>{
      this.products = res;
      this.isLoading = false;
    }, (err: any)=> {
      console.log(err);
      this.isLoading = false;
    })
  }

}
