import { apiBaseUrl } from './../../../constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { loadingGifUrl, paymentMethods, uploadsUrl } from 'src/constants';
import { PaymentTypesEnum } from 'src/enums/paymentTypes.enum';
import { isEmail } from 'src/methods/methods';
import { Product } from 'src/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css'],
})
export class ShowProductComponent implements OnInit {
  isLoading: boolean;
  productId: string;
  product: Product;
  uploadsUrl: string = uploadsUrl;
  paymentMethods: string[] = paymentMethods;
  selectedPayment: string = '';
  name: string;
  email: string;
  address: string;
  notes: string;
  phoneNumber: string;
  isOrdering: boolean = false;
  loadingGif: string = loadingGifUrl;
  cashType = PaymentTypesEnum.CASH;
  creditCardType = PaymentTypesEnum.CREDIT_CARD;
  stripeType = PaymentTypesEnum.STRIPE;
  errorOrderText: string = '';
  apiBaseUrl = apiBaseUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private alertService: ToastrService,
    private ngbModal: NgbModal,
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productsService.getById(this.productId).subscribe(
      (res: any) => {
        this.product = res;
        // TODO PAYPAL CONFIG
        // render({
        //   id: '#paypalButtons',
        //   currency: 'USD',
        //   value: this.product.price + '',
        //   onApprove: (details) => {
        //     console.log(details);
        //   },
        // });
        const success =
          this.activatedRoute.snapshot.queryParamMap.get('success');
        if (success)
          this.alertService.success(
            'Product ordered successfully, we will contact you soon'
          );
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

  open(content: any) {
    this.ngbModal.open(content, { windowClass: 'my-class' });
  }

  log(text: any) {
    console.log(text);
  }

  orderNow(
    address: string,
    productId: string,
    name: string,
    paymentType?: PaymentTypesEnum,
    email?: string,
    phoneNumber?: string,
    notes?: string,
    zipCode?: string
  ) {
    this.isLoading = true;
    this.errorOrderText = '';

    let data = {
      name: name,
      email: email,
      phone_number: phoneNumber,
      address: address,
      notes: notes,
      zip_code: zipCode,
      payment_type: paymentType,
      product_id: productId,
    };

    if (!name || !phoneNumber || !address) {
      this.errorOrderText = 'Please check all inputs before submitting';
      this.isLoading = false;
      return;
    }

    if (!isEmail(this.email)) {
      this.errorOrderText = 'Please provide a valid email';
      this.isLoading = false;
      return;
    }

    this.ordersService.store(data).subscribe(
      (res) => {
        this.alertService.success(
          'Product ordered successfully, we will contact you soon'
        );
        this.ngbModal.dismissAll();
        this.isLoading = false;
      },
      (error) => {
        this.alertService.error('Error ordering product');
        this.ngbModal.dismissAll();
        this.isLoading = false;
      }
    );
  }

  handleStripeResponse(data: any) {
    this.isLoading = true;
    const userAddress =
      'country: ' +
      data.owner.address.country +
      ' / city: ' +
      data.owner.address.city +
      ' / street: ' +
      data.owner.address.line1;

    let body = {
      name: data.owner.name,
      email: data.owner.email,
      phone_number: data.owner.phone,
      address: userAddress,
      zip_code: data.owner.address.postal_code,
      payment_type: PaymentTypesEnum.STRIPE,
      product_id: this.productId,
    };
    this.ordersService.store({ ...body, notes: undefined }).subscribe(
      (res) => {
        this.alertService.success(
          'Product ordered successfully, we will contact you soon'
        );
        this.ngbModal.dismissAll();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);

        this.alertService.error('Error ordering product');
        this.ngbModal.dismissAll();
        this.isLoading = false;
      }
    );
  }
}
