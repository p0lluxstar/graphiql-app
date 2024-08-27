import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { IFormRegistratonValues } from '@/types/interfaces';

const useRegistrationSchema = (): yup.ObjectSchema<IFormRegistratonValues> => {
  const t = useTranslations();

  return yup.object().shape({
    name: yup
      .string()
      .required(t('errNameRequired'))
      .matches(/^[a-zA-Z0-9]+$/, t('errNameLettersAndNumbers'))
      .min(3, t('errNameMinLength')),
    email: yup
      .string()
      .required(t('errEmailRequired'))
      .email(t('errEmailFormat')),
    password: yup
      .string()
      .required(t('errPasswordRequired'))
      .matches(/[A-Z]/, t('errPasswordCapitalLetter'))
      .matches(/[a-z]/, t('errPasswordLowercaseLetter'))
      .matches(/[0-9]/, t('errPasswordOneDigit'))
      .matches(/[!@#$%^&*()_+]/, t('errPasswordSpecialSymbol'))
      .min(8, t('errPasswordMinLength')),
    confirmPassword: yup
      .string()
      .required(t('errConfirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('errConfirmPasswordMatch')),
  });
};

export default useRegistrationSchema;
