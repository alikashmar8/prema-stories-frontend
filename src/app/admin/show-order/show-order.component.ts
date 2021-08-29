import { uploadsUrl } from 'src/constants';
import { Order } from './../../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderStatus } from 'src/enums/orderStatus.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
})
export class ShowOrderComponent implements OnInit {
  order: Order;
  orderId: string;
  isLoading: boolean;
  total: number = 0;
  uploadsUrl: string = uploadsUrl;
  statuses: string[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: ToastrService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    this.ordersService.getById(this.orderId).subscribe(
      (res: any) => {
        this.order = res;
        this.order.products?.forEach(
          (product) => (this.total += product.price)
        );
        this.statuses = Object.values(OrderStatus);

        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.router
          .navigate(['/'])
          .then(() => this.alertService.error(error.error.message));
      }
    );
  }

  updateStatus(status: any) {
    this.alertService.clear();
    this.isLoading = true;
    this.ordersService.updateStatus(this.orderId, status).subscribe(
      (res: any) => {
        console.log(res);

        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
        this.alertService.error('Updating status error!');
        this.isLoading = false;
      }
    );
  }
}
