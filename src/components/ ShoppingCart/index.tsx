import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch, actionCreators } from 'contexts/cart';

import imgClose from './assets/close.png';
import imgEmpty from './assets/empty.png';
import imgDelete from './assets/delete.png';
import styles from './styles.module.scss';

function ShoppingCart({ isOpen, setIsOpenModal }: any) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const books = useSelector(state => state.products);

  const deleteBook = (id: number) => {
    dispatch(actionCreators.deleteBook(id));
  };

  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <span className={styles.title}>{t('ShoppingCart:title')}</span>
              <button type="button" onClick={() => setIsOpenModal(false)}>
                <img src={imgClose} className={styles.imgClose} alt={t('ShoppingCart:imgClose')} />
              </button>
            </div>
            {books.length === 0 ? (
              <div className={styles.empty}>
                <img src={imgEmpty} className={styles.imgEmpty} alt={t('ShoppingCart:imgEmpty')} />
                <span className={styles.textTitleEmpty}>{t('ShoppingCart:textTitleEmpty')}</span>
                <span className={styles.textInfoEmpty}>{t('ShoppingCart:textInfoEmpty')}</span>
              </div>
            ) : (
              books.map(book => (
                <div key={book.id} className={styles.book}>
                  <span className={styles.bookDetail}>
                    {book.title} - {book.author}
                  </span>
                  <button type="button" onClick={() => deleteBook(book.id)}>
                    <img src={imgDelete} className={styles.imgDelete} alt={t('ShoppingCart:imgDelete')} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
