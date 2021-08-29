import { Category } from './category.model';

export class Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  total_reviews?: number;
  rating: number;
  image: string;
  category?: Category;
  category_id: string;
}
