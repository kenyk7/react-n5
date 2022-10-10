import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import Button from '~/ui/components/button';
import { isCartOpenAtom, cartStateMetadata } from '~/state/cartState';

import css from './Header.module.scss';

export function Header() {
  const [cartMeta] = useAtom(cartStateMetadata);
  const setCartOpen = useSetAtom(isCartOpenAtom);
  const [isChangeCart, setIscChangeCart] = useState(false);

  useEffect(() => {
    setIscChangeCart(true);
    setTimeout(() => {
      setIscChangeCart(false);
    }, 999);
  }, [cartMeta]);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header__content}>
          <h1 style={{ marginBottom: '0' }}>Tienda N5</h1>
          <div
            style={{
              animationName: isChangeCart ? 'pulse' : undefined,
              animationDuration: '0.5s',
            }}
          >
            <Button onClick={() => setCartOpen((prev) => !prev)}>
              Carrito({cartMeta.totalItems})
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
