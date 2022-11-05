import { useTranslation } from 'react-i18next';

export const validations = (watch?: any) => {
  // eslint-disable-next-line
  const { t } = useTranslation();

  const validation = {
    required: { required: t('FormsValidate:required') },
    email: {
      required: t('FormsValidate:required'),
      pattern: {
        // eslint-disable-next-line
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: t('FormsValidate:emailInvalid')
      }
    },
    password: {
      required: t('FormsValidate:required'),
      minLength: { value: 8, message: t('FormsValidate:minLengthPass') },
      validate: {
        letter: (value: string) => /[A-ZÁÉÍÓÚÜÑ]/.test(value) || t('FormsValidate:oneLetter'),
        number: (value: string) => /[0-9]/.test(value) || t('FormsValidate:oneNumber')
      }
    },
    passwordConfirm: {
      required: t('FormsValidate:required'),
      validate: (val: string) => val === watch('password') || t('FormsValidate:passwordConfirm')
    }
  };
  return validation;
};
