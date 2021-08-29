import { Product } from './product.model';

export class Category {
  id: string;
  name: string;
  description?: string;
  products?: Product[];
  created_at: any;
  updated_at: any;
}
