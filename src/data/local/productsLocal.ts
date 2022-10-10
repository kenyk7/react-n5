import { ProductsRepository } from '~/domain/products/ProductsRepository';
import productsJson from './products.json';

class ProductsLocal implements ProductsRepository {
  private products = productsJson.products;

  async getAll() {
    return this.products;
  }
}

export const productsLocal = new ProductsLocal();
