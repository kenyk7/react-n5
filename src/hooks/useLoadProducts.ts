import { productsKeyLStorage } from '~/constants';
import { configData } from '~/data/configData';
import { Product } from '~/domain/products/Product';

export const useLoadProducts = async () => {
  const lsProducts = localStorage.getItem(productsKeyLStorage);
  if (lsProducts) return JSON.parse(lsProducts) as Product[];
  return configData.products.getAll();
};
