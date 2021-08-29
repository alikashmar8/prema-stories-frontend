import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/models/category.model';
import { loadingGifUrl, uploadsUrl } from '../../../../constants';
import { Product } from '../../../../models/product.model';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  currentUser: User | null;
  isLoading: boolean;
  product: Product;
  productId: string;
  form: FormGroup;
  isUpdateLoading: boolean;
  isPhotoChanged: boolean = false;
  file: any;
  loadingGif: string = loadingGifUrl;
  uploadsUrl: string = uploadsUrl;
  categories: Category[] = [];
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: ToastrService,
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']).then(() => {});
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.isLoading = true;
    this.createForm();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.productId) this.router.navigate(['/']);
    this.productsService.getById(this.productId).subscribe(
      (res: any) => {
        console.log(res);
        this.product = res;
        this.categoryId = this.product.category_id;
        this.categoriesService.getAll().subscribe((res: any) => {
          this.categories = res;
          this.isLoading = false;
        });
      },
      (error) => {
        console.log(error);
        this.router
          .navigate(['/'])
          .then(() => this.alertService.error(error.error.message));
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      image: [null],
    });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    this.isPhotoChanged = true;
    console.log(this.file);
  }

  update() {
    this.isUpdateLoading = true;
    this.alertService.clear();
    console.log(this.product);

    if (
      this.form.invalid ||
      !this.product.name ||
      !this.product.quantity ||
      !this.product.price ||
      !this.product.description ||
      !this.product.category_id
    ) {
      this.isUpdateLoading = false;
      this.alertService.error('Check all values before submitting');
      return;
    }

    let data = new FormData();
    data.append('name', this.product.name);
    data.append('description', this.product.description);
    data.append('quantity', this.product.quantity + '');
    data.append('price', this.product.price + '');
    data.append('category_id', this.categoryId + '');
    if (this.isPhotoChanged) {
      data.append('photo', this.file, this.file.name);
    }

    this.productsService.update(this.productId, data).subscribe(
      (res: any) => {
        this.isUpdateLoading = false;
        console.log(res);
        this.product = res;
        this.alertService.success('Product Updated Successfully');
        this.form.reset('image');
      },
      (response) => {
        this.isUpdateLoading = false;
        console.log(response);
        this.alertService.error(response.error.message);
      }
    );
  }
}
