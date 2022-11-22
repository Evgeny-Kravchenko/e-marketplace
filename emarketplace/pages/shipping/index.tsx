import React, { ReactElement } from 'react';

import { PageTitle } from 'shared/ui';
import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { withPurchaseProcessStepper } from 'shared/hocs';
import { AddDelieveryAddressToOrderForm } from 'features/AddDelieveryAddressToOrder';

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
    <PageTitle>Shipping Address</PageTitle>
    <AddDelieveryAddressToOrderForm />
  </main>
));

const Shipping = (): ReactElement => {
  return (
    <MainLayout title='Shipping'>
      <Header />
      <Content activeStep={1} />
      <Footer />
    </MainLayout>
  );
};

Shipping.auth = true;

export default Shipping;
