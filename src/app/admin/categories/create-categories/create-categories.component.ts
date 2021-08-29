import { Component, OnInit } from '@angular/core';
import { loadingGifUrl } from '../../../../constants';
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css'],
})
export class CreateCategoriesComponent implements OnInit {
  isLoading: boolean = true;
  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;
  currentUser: User | null = null;
  name: string = '';
  description: string = '';

  constructor(
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private alertService: ToastrService,
    private router: Router
  ) {
    if (!authService.isAdmin()) {
      router.navigate(['/']).then();
    }
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  store() {
    this.isStoreLoading = true;
    this.alertService.clear();
    if (!this.name) {
      this.alertService.error('Name field should not be empty');
      this.isStoreLoading = false;
      return;
    }

    var data = {
      name: this.name,
      description: this.description,
    };
    this.categoriesService.store(data).subscribe(
      (res: any) => {
        this.name = '';
        this.description = '';
        this.isStoreLoading = false;
        this.alertService.success('Category stored successfully');
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.error.message);
      }
    );
  }
}
