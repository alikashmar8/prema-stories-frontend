import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminCategoriesComponent } from './admin/categories/admin-categories/admin-categories.component';
import { CreateCategoriesComponent } from './admin/categories/create-categories/create-categories.component';
import { EditCategoriesComponent } from './admin/categories/edit-categories/edit-categories.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdminProductsComponent } from './admin/products/admin-products/admin-products.component';
import { CreateProductsComponent } from './admin/products/create-products/create-products.component';
import { ProductsEditComponent } from './admin/products/products-edit/products-edit.component';
import { ShowOrderComponent } from './admin/show-order/show-order.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuardService } from 'src/guards/admin-guard.service';
import { AnonymousGuardService } from 'src/guards/anonymous-guard.service';
import { ShowProductComponent } from './pages/show-product/show-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuardService],
  },
  // admin routes
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: AdminProductsComponent,
          },
          {
            path: 'create',
            component: CreateProductsComponent,
          },
          {
            path: 'edit/:id',
            component: ProductsEditComponent,
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: AdminCategoriesComponent,
          },
          {
            path: 'create',
            component: CreateCategoriesComponent,
          },
          {
            path: 'edit/:id',
            component: EditCategoriesComponent,
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'orders/:id',
        component: ShowOrderComponent,
      },
    ],
    canActivate: [AdminGuardService],
  },

  {
    path: 'products',
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: ':id',
        component: ShowProductComponent,
      },
    ],
  },

  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
