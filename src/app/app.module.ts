import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { Section1Component } from './home/section1/section1.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsSectionComponent } from './home/products-section/products-section.component';
import { AboutAuthorsComponent } from './home/about-authors/about-authors.component';
import { HomeReviewsComponent } from './home/home-reviews/home-reviews.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReviewCardComponent } from './cards/review-card/review-card.component';
import { ArtToHealingComponent } from './home/art-to-healing/art-to-healing.component';
import { FooterComponent } from './common/footer/footer.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
