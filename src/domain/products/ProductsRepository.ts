import { Product } from './Product';

export interface ProductsRepository {
  getAll: () => Promise<Product[]>;
}
