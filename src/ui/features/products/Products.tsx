import { useAtom, useSetAtom } from 'jotai';
import { Product } from '~/domain/products/Product';
import { getUpdateCart, cartState } from '~/state/cartState';
import { productsState } from '~/state/productsState';
import Button from '~/ui/components/button';
import { ProductCard } from './ProductCard';

import css from './Products.module.scss';

export function Products() {
  const [products, setProducts] = useAtom(productsState);
  const setCart = useSetAtom(cartState);

  function addProduct() {
    const ids = products.map((i) => i.id);
    const nId = Math.max(...ids) + 1;
    const product: Product = {
      id: nId,
      name: `Producto ${nId}`,
      price: 99,
      amount: 9,
    };
    setProducts((prev) => [...prev, product]);
  }

  // eslint-disable-next-line
  function addProductToCart(product: Product) {
    if (!product.amount) return alert('Producto sin stock');
    try {
      setCart((prev) => getUpdateCart(prev, product));
    } catch (err) {
      alert(err);
    }
  }

  return (
    <section>
      <div className={css.head}>
        <h2 className="mb-0">Mis productos</h2>
        <div>
          <Button
            variant="primary"
            outlined
            size="sm"
            onClick={() => addProduct()}
          >
            Nuevo producto
          </Button>
        </div>
      </div>
      <ul className={css.products}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              onClick={() => addProductToCart(product)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
