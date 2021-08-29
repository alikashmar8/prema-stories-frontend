import { OrderStatus } from './../enums/orderStatus.enum';
import { PaymentTypesEnum } from 'src/enums/paymentTypes.enum';
import { Product } from './product.model';
// import { PaymentTypesEnum } from '../enums/payment-types.enum';

export class Order {
  id?: string;
  name?: string;
  address?: string;
  email?: string;
  phone_number?: string;
  payment_type: PaymentTypesEnum;
  status: OrderStatus;
  zip_code?: string;
  notes?: string;
  products?: Product[];
  created_at?: Date;
}
