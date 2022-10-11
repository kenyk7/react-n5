/* eslint consistent-return: "off" */
import { useAtom, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import { Product } from '~/domain/products/Product';
import { getUpdateCart, cartState } from '~/state/cartState';
import { productsState } from '~/state/productsState';
import Button from '~/ui/components/button';
import Modal from '~/ui/components/modal';
import { ProductCard } from './ProductCard';
import {
  FormProduct,
  PCreateFormRef,
  ProductCreateForm,
} from './ProductCreateForm';

import css from './Products.module.scss';

export function Products() {
  const formProductRef = useRef<PCreateFormRef>(null);
  const [isModalNewProduct, setIsModalNewProduct] = useState(false);
  const [products, setProducts] = useAtom(productsState);
  const setCart = useSetAtom(cartState);

  function createProduct(productForm: FormProduct) {
    // check exist product by name
    const res = [...products]
      .map((i) => i.name.toLowerCase())
      .includes(productForm.name.toLowerCase());
    if (res) return alert('Error: este producto ya existe!');

    // new product
    const ids = products.map((i) => i.id);
    const nId = Math.max(...ids) + 1;
    const product: Product = {
      ...productForm,
      id: nId,
    };
    setProducts((prev) => [...prev, product]);
    formProductRef.current?.reset();
    setIsModalNewProduct(false);
  }

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
            onClick={() => setIsModalNewProduct(true)}
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
      {/* modal product */}
      <Modal
        open={isModalNewProduct}
        closeOnBackdrop={false}
        title="Nuevo producto"
        onClose={() => {
          setIsModalNewProduct(false);
        }}
      >
        <ProductCreateForm
          ref={formProductRef}
          onSubmit={(e) => createProduct(e)}
        />
      </Modal>
    </section>
  );
}
