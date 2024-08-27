import * as yup from 'yup';
import { useTranslations } from 'next-intl';
import { IFormLoginValues } from '@/types/interfaces';

const useLoginSchema = (): yup.ObjectSchema<IFormLoginValues> => {
  const t = useTranslations();

  return yup.object().shape({
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
  });
};

export default useLoginSchema;
