import {
  FormEvent,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Product } from '~/domain/products/Product';
import Button from '~/ui/components/button';

import css from './Products.module.scss';

export type FormProduct = Omit<Product, 'id'>;

interface CProps {
  onSubmit: (product: FormProduct) => void;
}

export interface PCreateFormRef {
  reset: () => void;
}

function ProductCreateFormComp({ onSubmit }: CProps, ref: Ref<PCreateFormRef>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  useImperativeHandle(ref, () => ({
    reset: () => {
      formRef.current?.reset();
    },
  }));

  // eslint-disable-next-line
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name && !price && !amount)
      return alert('Completa toda la infomación del producto');
    const productForm: FormProduct = {
      name,
      price,
      amount,
    };
    onSubmit(productForm);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={css.createForm}>
      <div className={css.createForm__item}>
        <input
          type="text"
          placeholder="Nombre del producto"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={css.createForm__item}>
        <input
          type="number"
          placeholder="Precio"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className={css.createForm__item}>
        <input
          type="number"
          placeholder="Stock"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button block htmlType="submit">
        Guardar
      </Button>
    </form>
  );
}

export const ProductCreateForm = forwardRef(ProductCreateFormComp);
