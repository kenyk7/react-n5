import { renderHook, act } from '@testing-library/react-hooks';
import { useAtom } from 'jotai';

import {
  cartState,
  cartStateMetadata,
  getUpdateCart,
  getRemoveItemCart,
} from '~/state/cartState';

const productDemo = {
  name: 'Leche',
  price: 75000,
  amount: 2,
  id: 1,
};

describe('cart state', () => {
  // clear cart
  beforeEach(() => {
    const { result } = renderHook(() => useAtom(cartState));
    const [, setCart] = result.current;
    act(() => {
      setCart({});
    });
  });

  test('should cart empty', () => {
    const { result } = renderHook(() => useAtom(cartState));
    const [cart] = result.current;
    expect(cart).toEqual({});
  });

  test('should one y two items in cart, error stock & remove product', () => {
    const { result } = renderHook(() => useAtom(cartState));
    const [, setCart] = result.current;

    // validate quantity 1
    act(() => {
      setCart((prev) => getUpdateCart(prev, productDemo));
    });
    expect(result.current[0]).toEqual({
      1: {
        quantity: 1,
        product: productDemo,
      },
    });

    // validate quantity 2
    act(() => {
      setCart((prev) => getUpdateCart(prev, productDemo));
    });
    expect(result.current[0]).toStrictEqual({
      1: {
        quantity: 2,
        product: productDemo,
      },
    });

    // validate error stock
    try {
      act(() => {
        setCart((prev) => getUpdateCart(prev, productDemo));
      });
    } catch (e: any) {
      expect(e.message).toBe('Producto ya no cuenta con mas stock');
    }

    // validate remove product
    act(() => {
      setCart((prev) => getRemoveItemCart(prev, productDemo));
    });
    expect(result.current[0]).toStrictEqual({});
  });

  test('should cart meta correctly', () => {
    const { result: cartMetaAtom } = renderHook(() =>
      useAtom(cartStateMetadata)
    );
    const { result: cartAtom } = renderHook(() => useAtom(cartState));

    const [, setCart] = cartAtom.current;

    act(() => {
      setCart((prev) => getUpdateCart(prev, productDemo));
      setCart((prev) => getUpdateCart(prev, productDemo));
    });

    expect(cartMetaAtom.current[0]).toEqual({
      totalItems: 2,
      totalPayment: 75000 * 2,
    });
  });
});
