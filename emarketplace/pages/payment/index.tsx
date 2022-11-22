import React, { ReactElement } from 'react';
import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';

import { PageTitle } from 'shared/ui';
import { withPurchaseProcessStepper } from 'shared/hocs';
import { AddOrderPaymentMethodForm } from 'features/AddOrderPaymentMethod';

const Content = withPurchaseProcessStepper(() => (
  <main
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 20,
      flexGrow: 1,
    }}
  >
    <PageTitle>Payment</PageTitle>
    <AddOrderPaymentMethodForm />
  </main>
));

const Payment = (): ReactElement => {
  return (
    <MainLayout>
      <Header />
      <Content activeStep={2} />
      <Footer />
    </MainLayout>
  );
};

Payment.auth = true;

export default Payment;
