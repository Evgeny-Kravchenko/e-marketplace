import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { Typography, Stack, Button } from '@mui/material';

import { SeparateLabelInputWrapper, TextField } from 'shared/ui';

import { SignInForm } from './SignInByCredentialsFormStyles';

interface SignInForm {
  email: string;
  password: string;
}

export const SignInByCredentialsForm = (): ReactElement => {
  const { register, handleSubmit, formState } = useForm<SignInForm>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: SignInForm): void => {
    console.log(data);
  };

  return (
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' sx={{ fontSize: '3rem', fontWeight: 500 }}>
        <Stack spacing={2}>
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
                autoComplete: 'current-password',
                ...register('password', {
                  required: 'Please enter a password',
                  minLength: { value: 6, message: 'password is more than 5 characters' },
                }),
              }}
            />
          </SeparateLabelInputWrapper>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            sx={{ fontSize: '1.6rem' }}
            disabled={!formState.isValid}
          >
            Login
          </Button>
          <Typography
            variant='body1'
            sx={{
              fontSize: '1.4rem',
              '& a': { color: (theme) => theme.palette.secondary.dark },
            }}
          >
            Do you have an acoount? <Link href='sign-up'>Register</Link>
          </Typography>
        </Stack>
      </Typography>
    </SignInForm>
  );
};
