import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ContactUsForm,
  type ContactUsFormState,
} from '@/components/contact-us';
import {
  type CreateFeedbackRequest,
  useCreateFeedbackMutation,
} from 'services/app-api';

interface P {
  className?: string;
}

export const ContactUsFormContainer = ({ className }: P) => {
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactUsFormState>({ mode: 'onBlur' });

  const [createFeedback, { isSuccess, isLoading }] =
    useCreateFeedbackMutation();

  const onSubmit = async (data: ContactUsFormState) => {
    const name = data.name.trim();
    const text = data.text.trim();
    if (name && text) {
      const req: CreateFeedbackRequest = { name, text };
      if (data.email) req.email = data.email.trim();
      await createFeedback(req).unwrap();
      setOpen(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) reset({ name: '', email: '', text: '' });
  }, [isSuccess, reset]);

  return (
    <>
      <ContactUsForm
        className={className}
        control={control}
        errors={errors}
        isValid={isValid}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {isSuccess ? t('feedback_success') : t('smth_went_wrong')}
        </Alert>
      </Snackbar>
    </>
  );
};
