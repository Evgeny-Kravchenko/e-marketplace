import React, { ReactElement, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { RegisterForm } from 'features/Auth';
import { PageTitle } from 'shared/ui';

import { SignInFormContainer } from './styles';

const Register = (): ReactElement => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push((redirect as string) || '/');
    }
  }, [router, session, redirect]);

  return (
    <MainLayout title='Register'>
      <Header />
      <SignInFormContainer>
        <PageTitle>Register</PageTitle>
        <RegisterForm />
      </SignInFormContainer>
      <Footer />
    </MainLayout>
  );
};

export default Register;
