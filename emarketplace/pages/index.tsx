import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

import { MainLayout } from 'shared/layouts';
import { Header, Footer } from 'widgets';
import { typicodeApi, Product as IProduct } from 'shared/api';
import { ProductCard } from 'entities/product';
import { AddToCart } from 'features';

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

import { styled } from '@mui/material';

export const ProductsListContainer = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
}));

export const ProductsListItemContainer = styled('div')(() => ({}));

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
