import Send from '@mui/icons-material/Send';
import { Button, TextField, TextFieldProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Controller, Control, FieldErrorsImpl } from 'react-hook-form';

import styles from './contact-us-form.module.scss';
import { ContactUsFormState } from './contact-us-form.type';

interface P {
  className?: string;
  control: Control<ContactUsFormState>;
  errors: FieldErrorsImpl<ContactUsFormState>;
  isLoading: boolean;
  isValid: boolean;
  onSubmit: () => void;
}

const StyledTextField = (props: TextFieldProps) => (
  <TextField
    className="custom-text-field"
    fullWidth
    margin="dense"
    size="small"
    variant="outlined"
    {...props}
  />
);

export const ContactUsForm = ({
  className = '',
  control,
  errors,
  isValid,
  isLoading,
  onSubmit,
}: P) => {
  const { t } = useTranslation();

  return (
    <form className={styles.form + ' ' + className} onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          pattern: /^[A-Za-zА-Яа-яЁё0-9]+[A-Za-zА-Яа-яЁё0-9 ,.!?-]+$/,
        }}
        render={({ field }) => (
          <StyledTextField
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label={t('form_username') + ' *'}
            error={errors && 'name' in errors}
            helperText={errors?.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            type="email"
            label={t('form_email')}
            error={errors && 'email' in errors}
            helperText={errors?.email?.message}
          />
        )}
      />
      <Controller
        name="text"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          pattern: /^[A-Za-zА-Яа-яЁё0-9]+[\nA-Za-zА-Яа-яЁё0-9 ,.!?-]+$/,
        }}
        render={({ field }) => (
          <StyledTextField
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label={t('form_text') + ' *'}
            multiline
            minRows={5}
            error={errors && 'text' in errors}
            helperText={errors?.text?.message}
          />
        )}
      />
      <Button
        type="submit"
        endIcon={<Send />}
        disabled={!isValid || isLoading}
        variant="contained"
        size="medium"
      >
        {t('form_button_send')}
      </Button>
    </form>
  );
};
