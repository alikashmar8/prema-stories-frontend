import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loadingGifUrl } from '../../../../constants';
import { Category } from '../../../../models/category.model';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css'],
})
export class CreateProductsComponent implements OnInit {
  isLoading: boolean = true;
  currentUser: User | null = null;
  form: any;
  categories: Category[] = [];
  isStoreLoading: boolean = false;
  file: any;
  loadingGif: string = loadingGifUrl;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private alertService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.isStoreLoading = false;
    this.authService.isAdmin()
      ? (this.currentUser = this.authService.currentUser)
      : this.router.navigate(['/']);

    this.createForm();
    this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res;
      this.isLoading = false;
    });
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      image: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      rating: [null, Validators.required],
      category: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  store() {
    this.isStoreLoading = true;
    this.alertService.clear();
    if (this.form.invalid) {
      this.isStoreLoading = false;
      this.alertService.error('Check all values before submitting');
      return;
    }

    let data = new FormData();
    data.append('name', this.form.value.name);
    data.append('description', this.form.value.description);
    data.append('quantity', this.form.value.quantity);
    data.append('price', this.form.value.price);
    data.append('rating', this.form.value.rating);
    data.append('category_id', this.form.value.category);
    data.append('photo', this.file, this.file.name);

    this.productsService.store(data).subscribe(
      (res) => {
        this.isStoreLoading = false;
        console.log(res);
        this.alertService.success('Product Created Successfully');
        this.form.reset();
      },
      (response) => {
        this.isStoreLoading = false;
        console.log(response);
        this.alertService.error(response.error.message);
      }
    );
  }
}
