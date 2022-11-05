import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import styles from './styles.module.scss';

function Language() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('es');

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={changeLanguage} value={language}>
        <option value="es">{t('Translation:spanish')}</option>
        <option value="en">{t('Translation:english')}</option>
      </select>
    </div>
  );
}

export default Language;
