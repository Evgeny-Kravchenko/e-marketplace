import React, { ReactElement, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { styled } from '@mui/material';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { SignInByCredentialsForm } from 'features/Auth';
import { PageTitle } from 'shared/ui';

const SignInFormContainer = styled('main')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flexGrow: 1,
}));

const Login = (): ReactElement => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push((redirect as string) || '/');
    }
  }, [router, session, redirect]);

  return (
    <MainLayout title='Login'>
      <Header />
      <SignInFormContainer>
        <PageTitle>Login</PageTitle>
        <SignInByCredentialsForm />
      </SignInFormContainer>
      <Footer />
    </MainLayout>
  );
};

export default Login;
