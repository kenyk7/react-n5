import { Product } from '~/domain/products/Product';
import Button from '~/ui/components/button';

import css from './Products.module.scss';

interface ProductProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductProps) {
  return (
    <article className={css.product}>
      <div>
        <h3 className={css.product__title}>{product.name}</h3>
        <p>Precio: ${product.price}</p>
        <div className={css.product__footer}>
          <span>Stock: {product.amount}</span>
          <Button
            size="sm"
            variant="secondary"
            outlined
            disabled={!product.amount}
            onClick={() => onClick()}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </article>
  );
}
