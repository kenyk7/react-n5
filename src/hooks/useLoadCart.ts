import { cartKeyLStorage } from '~/constants';
import { Product } from '~/domain/products/Product';

export const useLoadCart = () => {
  const lsProducts = localStorage.getItem(cartKeyLStorage);
  return (lsProducts ? JSON.parse(lsProducts) : []) as Product[];
};
