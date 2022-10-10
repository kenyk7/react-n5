import { useAtom, useSetAtom } from 'jotai';
import { Product } from '~/domain/products/Product';
import {
  cartState,
  cartStateItems,
  cartStateMetadata,
  getRemoveItemCart,
  isCartOpenAtom,
} from '~/state/cartState';
import { getUpdateProductsAmounts, productsState } from '~/state/productsState';
import Button from '~/ui/components/button';

import css from './Cart.module.scss';

export function Cart() {
  const [cart, setCart] = useAtom(cartState);
  const [cartItems] = useAtom(cartStateItems);
  const [cartMeta] = useAtom(cartStateMetadata);
  const setCartOpen = useSetAtom(isCartOpenAtom);
  const setProducts = useSetAtom(productsState);

  function removeProduct(product: Product) {
    const newCart = getRemoveItemCart(cart, product);
    setCart(newCart);
  }

  function checkout() {
    if (!cartMeta.totalItems) return;
    setProducts((prev) => getUpdateProductsAmounts(prev, cart));
    // cleanCart
    setCart({});
  }

  return (
    <div className={css.cart} style={{ animationName: 'fadeIn' }}>
      <div
        className={css.cart__content}
        style={{ animationName: 'slideInRight' }}
      >
        <div className={css.cart__head}>
          <h2 className="mb-0">Mi carrito({cartMeta.totalItems})</h2>
          <div>
            <Button
              variant="primary"
              outlined
              size="sm"
              onClick={() => setCartOpen(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
        <div className={css.cart__products}>
          {!cartMeta.totalItems && (
            <div className={css.cart__empty}>
              <div style={{ marginBottom: '1rem' }}>Tu carrito está vacío</div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCartOpen(false)}
              >
                Comprar ahora
              </Button>
            </div>
          )}
          <ul className={css.products}>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <article className={css.product}>
                  <div>
                    <h3 className={css.product__title}>{item.product.name}</h3>
                    <p>Precio: ${item.product.price}</p>
                    <div className={css.product__footer}>
                      <span>Cant: {item.quantity}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        outlined
                        onClick={() => removeProduct(item.product)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {Boolean(cartMeta.totalItems) && (
            <div className="text-center">
              <Button
                variant="secondary"
                size="sm"
                outlined
                onClick={() => setCart({})}
              >
                Vaciar carrito
              </Button>
            </div>
          )}
        </div>
        <div className={css.cart__footer}>
          <div className={css.cart__footer_info}>
            <span>Total a pagar:</span>
            <b>${cartMeta.totalPayment.toFixed(2)}</b>
          </div>
          <Button
            disabled={!cartMeta.totalItems}
            block
            onClick={() => checkout()}
          >
            Comprar productos
          </Button>
        </div>
      </div>
    </div>
  );
}
