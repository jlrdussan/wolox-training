import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'contexts/cart';

import ShoppingCart from '../ ShoppingCart/index';

import imgCart from './assets/cart.png';
import styles from './styles.module.scss';

function Cart() {
  const books = useSelector(state => state.products);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.containerCart}>
        <button type="button" onClick={() => setIsOpenModal(true)}>
          <img className={styles.cart} src={imgCart} alt={t('Cart:imgCart')} />
          <div className={styles.ellipse}>
            <span className={styles.cantCart}>{books.length}</span>
          </div>
        </button>
      </div>
      <ShoppingCart isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
}

export default Cart;
