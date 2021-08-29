import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit {
  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
