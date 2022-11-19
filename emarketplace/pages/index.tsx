import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { typicodeApi } from 'shared/api';
import { ProductCard } from 'entities/product';
import { AddToCart } from 'features';

import { ProductsListContainer, ProductsListItemContainer } from './styles';

export const getStaticProps: GetStaticProps<{
  products: typicodeApi.getProductsReturn;
}> = async () => {
  const data = await typicodeApi.getProducts();
  return {
    props: {
      products: data,
    },
  };
};

interface Props {
  products: typicodeApi.getProductsReturn;
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
                renderAction={(id: string) => (
                  <AddToCart id={id} numInStock={product.countInStock} />
                )}
              />
            </ProductsListItemContainer>
          ))}
        </ProductsListContainer>
      </main>
      <Footer />
    </MainLayout>
  );
}
