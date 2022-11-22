import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Typography } from '@mui/material';

import { PageTitle } from 'shared/ui';
import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';

const Unauthorized = (): ReactElement => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <MainLayout title='Unauthorized page'>
      <Header />
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <PageTitle>Access Denied</PageTitle>
        {message && (
          <Typography variant='body1' color='error' sx={{ fontSize: '2rem' }}>
            {message}
          </Typography>
        )}
      </main>
      <Footer />
    </MainLayout>
  );
};

export default Unauthorized;
