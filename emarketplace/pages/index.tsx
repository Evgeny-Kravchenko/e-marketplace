import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { typicodeApi, Product as IProduct } from 'shared/api';
import { ProductCard } from 'entities/product';
import { AddToCart } from 'features';

import { ProductsListContainer, ProductsListItemContainer } from './styles';

export const getServerSideProps: GetStaticProps<{
  products: IProduct[];
}> = async () => {
  const data = await typicodeApi.getProducts();
  return {
    props: {
      products: data,
    },
  };
};

interface Props {
  products: IProduct[];
}

export default function Home({ products }: Props): ReactElement {
  return (
    <MainLayout title='Home page'>
      <Header />
      <main>
        <ProductsListContainer>
          {products.map((product) => (
            <ProductsListItemContainer key={product.id}>
              <ProductCard
                key={product.id}
                product={product}
                renderAction={(orderItem: IProduct) => (
                  <AddToCart orderItemId={orderItem.id} />
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
