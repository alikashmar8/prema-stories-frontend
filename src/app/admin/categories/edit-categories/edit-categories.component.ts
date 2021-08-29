import { Component, OnInit } from '@angular/core';
import { loadingGifUrl } from '../../../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../../models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
})
export class EditCategoriesComponent implements OnInit {
  currentUser: User | null;
  category: Category;
  categoryId: string;
  isLoading: boolean;
  isEditLoading: boolean;
  loadingGif: string = loadingGifUrl;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: ToastrService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']).then(() => {});
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.isLoading = true;
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.categoryId) this.router.navigate(['/']);
    this.categoriesService.getById(this.categoryId).subscribe(
      (res: any) => {
        console.log(res);
        this.category = res;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.router
          .navigate(['/'])
          .then(() => this.alertService.error(error.error.message));
      }
    );
  }

  update() {
    this.isEditLoading = true;
    this.alertService.clear();
    if (!this.category.name) {
      this.alertService.error('Name field should not be empty');
      this.isEditLoading = false;
      return;
    }

    var data = {
      name: this.category.name,
      description: this.category.description,
    };
    this.categoriesService.update(this.categoryId, data).subscribe(
      (res: any) => {
        this.category = res;
        this.isEditLoading = false;
        this.alertService.success('Category updated successfully');
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.error.message);
      }
    );
  }
}
