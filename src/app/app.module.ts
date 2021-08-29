import { ShowProductComponent } from './pages/show-product/show-product.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminCategoriesComponent } from './admin/categories/admin-categories/admin-categories.component';
import { CreateCategoriesComponent } from './admin/categories/create-categories/create-categories.component';
import { EditCategoriesComponent } from './admin/categories/edit-categories/edit-categories.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdminProductsComponent } from './admin/products/admin-products/admin-products.component';
import { CreateProductsComponent } from './admin/products/create-products/create-products.component';
import { ProductsEditComponent } from './admin/products/products-edit/products-edit.component';
import { ShowOrderComponent } from './admin/show-order/show-order.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductCardComponent } from './cards/product-card/product-card.component';
import { ReviewCardComponent } from './cards/review-card/review-card.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoadingScreenComponent } from './common/loading-screen/loading-screen.component';
import { AboutAuthorsComponent } from './home/about-authors/about-authors.component';
import { ArtToHealingComponent } from './home/art-to-healing/art-to-healing.component';
import { HomeReviewsComponent } from './home/home-reviews/home-reviews.component';
import { HomeComponent } from './home/home.component';
import { ProductsSectionComponent } from './home/products-section/products-section.component';
import { Section1Component } from './home/section1/section1.component';
import { ShopComponent } from './pages/shop/shop.component';
import {MatSelectModule} from '@angular/material/select';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Section1Component,
    HomeComponent,
    ProductsSectionComponent,
    AboutAuthorsComponent,
    HomeReviewsComponent,
    ReviewCardComponent,
    ArtToHealingComponent,
    FooterComponent,
    ShopComponent,
    LoadingScreenComponent,
    ProductCardComponent,
    AdminHomeComponent,
    AdminCategoriesComponent,
    CreateCategoriesComponent,
    EditCategoriesComponent,
    OrdersComponent,
    AdminProductsComponent,
    CreateProductsComponent,
    ProductsEditComponent,
    ShowOrderComponent,
    LoginComponent,
    ShowProductComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
