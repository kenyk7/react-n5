import { atomWithStorage } from 'jotai/utils';
import { CartState } from '~/state/cartState';
import { productsKeyLStorage } from '~/constants';

import { Product } from '~/domain/products/Product';

export const productsState = atomWithStorage<Product[]>(
  productsKeyLStorage,
  []
);

export const getUpdateProductsAmounts = (
  prevProducts: Product[],
  cartState: CartState
) => {
  const clonProducts = [...prevProducts];

  return clonProducts.map((product) => {
    const productCart = cartState[product.id];
    let { amount } = product;
    if (productCart) {
      amount = product.amount - productCart.quantity;
    }
    return {
      ...product,
      amount,
    };
  });
};
