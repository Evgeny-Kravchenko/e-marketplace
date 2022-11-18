import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { getProducts, getProductsReturn } from 'shared/api';
import { ProductCard } from 'entities/product';
import { AddToCart } from 'features';

import { ProductsListContainer, ProductsListItemContainer } from './styles';

export const getStaticProps: GetStaticProps<{
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
              <ProductCard
                key={product.id}
                product={product}
                renderAction={(id: string) => <AddToCart id={id} />}
              />
            </ProductsListItemContainer>
          ))}
        </ProductsListContainer>
      </main>
      <Footer />
    </MainLayout>
  );
}
