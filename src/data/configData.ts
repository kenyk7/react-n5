// import { ProductsRepository } from "~/domain/products/ProductsRepository";
import { ProductsRepository } from '~/domain/products/ProductsRepository';
import { productsLocal } from './local/productsLocal';

export class ConfigData {
  products: ProductsRepository;

  constructor() {
    this.products = productsLocal;
  }
}

export const configData = new ConfigData();
