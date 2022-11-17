import { ReactElement } from 'react';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';

export default function Home(): ReactElement {
  return (
    <MainLayout title='Home page'>
      <Header />
      <main>App</main>
      <Footer />
    </MainLayout>
  );
}
