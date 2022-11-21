import React, { ReactElement } from 'react';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { SignInByCredentialsForm } from 'features/Auth';
import { PageTitle } from 'shared/ui';

import { SignInFormContainer } from './styles';

const Login = (): ReactElement => {
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
