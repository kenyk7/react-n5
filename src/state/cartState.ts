import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { cartKeyLStorage } from '~/constants';

import { Product } from '~/domain/products/Product';

interface CartStateItem {
  quantity: number;
  product: Product;
}

export interface CartState {
  [id: number]: CartStateItem;
}

interface CartStateMeta {
  totalItems: number;
  totalPayment: number;
}

export const isCartOpenAtom = atom(false);

export const cartState = atomWithStorage<CartState>(cartKeyLStorage, {});

export const cartStateItems = atom<CartStateItem[]>((get) => {
  return Object.values(get(cartState));
});

export const cartStateMetadata = atom<CartStateMeta>((get) => {
  const items = Object.values(get(cartState)) as CartStateItem[];
  let totalItems = 0;
  let totalPayment = 0;

  if (items.length) {
    totalItems = items
      .map((i) => i.quantity)
      .reduce((prev, current) => prev + current);
    totalPayment = items
      .map((i) => i.quantity * i.product.price)
      .reduce((prev, current) => prev + current);
  }

  return {
    totalItems,
    totalPayment,
  };
});

//
// fn actions reusable
//

export const getUpdateCart = (prevCart: CartState, product: Product) => {
  const clonProducts = { ...prevCart };

  // if product not exists in cart
  if (!clonProducts[product.id]) {
    return { ...prevCart, [product.id]: { quantity: 1, product } };
  }

  // if product not stock
  const currentProduct = clonProducts[product.id];
  if (currentProduct.quantity >= product.amount)
    throw Error('Producto ya no cuenta con mas stock');

  // if the product has stock +1
  clonProducts[product.id].quantity += 1;
  return { ...clonProducts };
};

export const getRemoveItemCart = (prevCart: CartState, product: Product) => {
  const clonProducts = { ...prevCart };
  delete clonProducts[product.id];
  return clonProducts;
};
