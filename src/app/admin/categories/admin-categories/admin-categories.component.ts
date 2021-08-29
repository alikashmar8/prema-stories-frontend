import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { loadingGifUrl } from '../../../../constants';
import { Category } from '../../../../models/category.model';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  private currentUser: User | null = null;
  isLoading: boolean = true;
  isDeleteLoading: boolean = false;
  loadingGifUrl: string = loadingGifUrl;
  categoryId: string | undefined = '';
  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private modalService: NgbModal,
    private router: Router,
    private alertService: ToastrService
  ) {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']).then(() => {});
    }
  }

  open(content: any, categoryId?: string) {
    this.modalService.open(content, { windowClass: 'modal-global' });
    this.categoryId = categoryId;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesService.getAll().subscribe(
      (res: any) => {
        this.categories = res;
        this.isLoading = false;
      },
      (exception) => console.log(exception)
    );
  }

  delete() {
    this.isDeleteLoading = true;

    this.categoriesService.delete(this.categoryId).subscribe(
      (res) => {
        this.isDeleteLoading = false;
        window.location.reload();
      },
      (exception) => {
        console.log(exception);
        this.alertService.error('Error deleting category');
      }
    );
  }
}
