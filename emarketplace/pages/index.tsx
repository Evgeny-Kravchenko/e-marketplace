import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { getProducts, getProductsReturn } from 'shared/api';
import { ProductCard } from 'entities/product';

import { ProductsListContainer, ProductsListItemContainer } from './styles';

export const getServerSideProps: GetServerSideProps<{
  products: getProductsReturn;
}> = async () => {
  return {
    props: {
      products: getProducts(),
    },
  };
};

interface Props {
  products: getProductsReturn;
}

export default function Home({ products }: Props): ReactElement {
  return (
    <MainLayout title='Home page'>
      <Header />
      <main>
        <ProductsListContainer>
          {products.data.map((product) => (
            <ProductsListItemContainer key={product.id}>
              <ProductCard key={product.id} product={product} />
            </ProductsListItemContainer>
          ))}
        </ProductsListContainer>
      </main>
      <Footer />
    </MainLayout>
  );
}
