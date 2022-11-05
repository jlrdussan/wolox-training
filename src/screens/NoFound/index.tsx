import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

function NoFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <span className={styles.noFound}>{t('NoFound:noFound')}</span>
    </div>
  );
}

export default NoFound;
