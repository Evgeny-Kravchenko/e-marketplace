import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Typography, Stack, Button } from '@mui/material';
import { SeparateLabelInputWrapper, TextField } from 'shared/ui';
import { useHttpClient } from 'shared/libs';

import { RegisterFormContainer } from './RegisterFormStyles';
import { SignUp } from 'shared/api';
import { getError } from 'shared/utils';

interface RegisterFormType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = (): ReactElement => {
  const httpClient = useHttpClient();
  const router = useRouter();
  const { redirect } = router.query;

  const { register, handleSubmit, formState, getValues } = useForm<RegisterFormType>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const { mutateAsync, isLoading } = useMutation(
    async (data: SignUp) => {
      await httpClient.post('/api/auth/signup', data);
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    },
    {
      onError: (err) => {
        toast.error(getError(err));
      },
    }
  );

  const onSubmit = async (data: RegisterFormType): Promise<void> => {
    mutateAsync(data);
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' sx={{ fontSize: '3rem', fontWeight: 500 }}>
        <Stack spacing={2}>
          <SeparateLabelInputWrapper
            label='Name'
            id='name'
            helperText={formState.errors?.name?.message}
            error={Boolean(formState.errors.name)}
          >
            <TextField
              id='name'
              error={Boolean(formState.errors.name)}
              inputProps={{
                autoFocus: true,
                autoComplete: 'off',
                type: 'text',
                ...register('name', {
                  required: 'Please enter a name',
                }),
              }}
            />
          </SeparateLabelInputWrapper>
          <SeparateLabelInputWrapper
            label='Login'
            id='login'
            helperText={formState.errors?.email?.message}
            error={Boolean(formState.errors.email)}
          >
            <TextField
              id='login'
              error={Boolean(formState.errors.email)}
              inputProps={{
                ...register('email', {
                  required: 'Please enter the email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter a valid email',
                  },
                }),
              }}
            />
          </SeparateLabelInputWrapper>
          <SeparateLabelInputWrapper
            label='Password'
            id='password'
            helperText={formState.errors?.password?.message}
            error={Boolean(formState.errors.password)}
          >
            <TextField
              id='password'
              error={Boolean(formState.errors.password)}
              inputProps={{
                type: 'password',
                autoComplete: 'new-password',
                ...register('password', {
                  required: 'Please enter a password',
                  minLength: { value: 6, message: 'password is more than 5 characters' },
                }),
              }}
            />
          </SeparateLabelInputWrapper>
          <SeparateLabelInputWrapper
            label='Confirm password'
            id='confirm-password'
            helperText={
              formState.errors?.confirmPassword?.type === 'validate'
                ? "Passwords don't match "
                : formState.errors?.confirmPassword?.message
            }
            error={Boolean(formState.errors.confirmPassword)}
          >
            <TextField
              id='confirmPassword'
              error={Boolean(formState.errors.confirmPassword)}
              inputProps={{
                type: 'password',
                autoComplete: 'confirm-password',
                ...register('confirmPassword', {
                  required: 'Please enter a password',
                  validate: (value: string) => value === getValues('password'),
                  minLength: {
                    value: 6,
                    message: 'confirm password is more than 5 characters',
                  },
                }),
              }}
            />
          </SeparateLabelInputWrapper>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            sx={{ fontSize: '1.6rem' }}
            disabled={!formState.isValid || isLoading}
          >
            Register
          </Button>
          <Typography
            variant='body1'
            sx={{
              fontSize: '1.4rem',
              '& a': { color: (theme) => theme.palette.secondary.dark },
            }}
          >
            Do not have an account?{' '}
            <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
          </Typography>
        </Stack>
      </Typography>
    </RegisterFormContainer>
  );
};
