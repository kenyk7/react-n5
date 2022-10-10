import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLoadProducts } from '~/hooks/useLoadProducts';
import { isCartOpenAtom } from '~/state/cartState';
import { productsState } from '~/state/productsState';
import { Header } from '~/ui/features/header';
import { Products } from '~/ui/features/products';
import { Cart } from '~/ui/features/cart';

export function Home() {
  const resProducts = useLoadProducts();
  const [isLoading, setIsLoading] = useState(true);
  const setProducts = useSetAtom(productsState);
  const [isCartOpen] = useAtom(isCartOpenAtom);

  useEffect(() => {
    resProducts.then((res) => {
      setProducts(() => [...res]);
      setIsLoading(false);
    });
  }, [resProducts, setProducts, setIsLoading]);

  return (
    <main>
      <Header />
      <br />
      <div className="container">
        {isLoading ? 'Loading...' : <Products />}
        {isCartOpen && <Cart />}
      </div>
    </main>
  );
}
