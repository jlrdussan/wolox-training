import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import LogoContainer from '../../components/LogoContainer/index';
import Input from '../../components/Input/index';
import { validations } from '../../constants/formsValidation';
import { IFormLogin } from '../../utils/types';
import { login } from '../../services/UsersService';
import Notification from '../../components/Notification/index';
import { sessionUser } from '../../utils/sessionManagement';

import styles from './styles.module.scss';

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [credentialsError, setCredentialsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormLogin>({ mode: 'onChange' });

  const mutation = useMutation(login, {
    onSuccess: (data: any) => {
      if (data.ok) {
        const { uid, client } = data.headers;
        const accessToken = data.headers['access-token'];
        sessionUser({ accessToken, client, uid });
        navigate('/home', { replace: true });
      } else {
        setCredentialsError(true);
      }
    }
  });

  const onSubmit = (data: IFormLogin) => {
    setCredentialsError(false);
    mutation.reset();
    mutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <LogoContainer />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('FormsLabels:email')}
          name="email"
          type="email"
          register={register}
          errors={errors}
          validations={validations().email}
        />
        <Input
          label={t('FormsLabels:password')}
          name="password"
          type="password"
          register={register}
          errors={errors}
          validations={validations().required}
        />
        {credentialsError && <Notification message={t('Login:credentialsError')} type="error" />}
        {mutation.error && <Notification message={t('Login:loginError')} type="error" />}
        <div className="btn-container">
          <button className="btn-primary" type="submit">
            {t('FormsButtons:login')}
          </button>
          <div className={styles.bar} />
          <Link to="/sign_up">
            <button className="btn-secondary" type="button">
              {t('FormsButtons:signUp')}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
