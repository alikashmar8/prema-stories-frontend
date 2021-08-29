import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { loadingGifUrl, uploadsUrl } from 'src/constants';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;

  uploadsUrl: string= uploadsUrl;
  isDeleteLoading: boolean = false;
  loadingGifUrl: string= loadingGifUrl;
  isAdmin: boolean = false;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private productsService: ProductsService,
    private alertService: ToastrService
  ) {
    this.isAdmin = authService.isAdmin();
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content);
  }

  delete() {
    this.isDeleteLoading = true;

    this.productsService.delete(this.product.id).subscribe(
      (res) => {
        this.alertService.success('Product Deleted Successfully!');
        this.modalService.dismissAll();
        this.isDeleteLoading = false;
        window.location.reload();
      },
      (error) => console.log(error)
    );
  }
}
