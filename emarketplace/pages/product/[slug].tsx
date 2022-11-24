import React, { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { typicodeApi, Product } from 'shared/api';
import { ProductPurchaseInfo } from 'entities/product';
import { AddToCart } from 'features';

import { Typography } from '@mui/material';

import { styled, Link as MuiLink, List, ListItem, ListItemText } from '@mui/material';

export const ProductDetailsContainer = styled('main')(() => ({}));

export const ProductDetailsLink = styled(MuiLink)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
}));

export const ProductDetailsContent = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '2fr 1fr 1fr',
  },
}));

export const ProductDetailsImageContainer = styled('figure')(({ theme }) => ({
  position: 'relative',
  height: 300,
  margin: 0,
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('lg')]: {
    height: 500,
  },
}));

const ProductDetailsInfoContainer = styled(List)(() => ({}));

const ProductDetailsInfoItem = styled(ListItem)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const ProductDetailsInfoItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.6rem',
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8rem',
    },
  },
}));

export const getServerSideProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const product = await typicodeApi.getProductById(slug as string);

  return {
    props: { product },
  };
};

interface Props {
  product: Product;
}

const ProductDetails = ({ product }: Props): ReactElement => {
  const {
    id,
    name,
    image,
    brand,
    rating,
    numReviews,
    description,
    price,
    countInStock,
    category,
  } = product || {};

  const status = countInStock > 0 ? 'In stock' : 'Unavailable';

  return (
    <MainLayout title={name}>
      <Header />
      <ProductDetailsContainer>
        <ProductDetailsLink href='/'>{`<-- Back to products`}</ProductDetailsLink>
        <ProductDetailsContent>
          {!product && <Typography variant='h3'>Product is not found</Typography>}
          {product && (
            <>
              <ProductDetailsImageContainer>
                <Image fill alt={name} src={image} />
              </ProductDetailsImageContainer>
              <ProductDetailsInfoContainer dense>
                <ProductDetailsInfoItem>
                  <ProductDetailsInfoItemText>{name}</ProductDetailsInfoItemText>
                </ProductDetailsInfoItem>
                <ProductDetailsInfoItem>
                  <ProductDetailsInfoItemText>
                    Category: {category}
                  </ProductDetailsInfoItemText>
                </ProductDetailsInfoItem>
                <ProductDetailsInfoItem>
                  <ProductDetailsInfoItemText>Brand: {brand}</ProductDetailsInfoItemText>
                </ProductDetailsInfoItem>
                <ProductDetailsInfoItem>
                  <ProductDetailsInfoItemText>
                    {rating} of {numReviews} reviews
                  </ProductDetailsInfoItemText>
                </ProductDetailsInfoItem>
                <ProductDetailsInfoItem>
                  <ProductDetailsInfoItemText>
                    Description: {description}
                  </ProductDetailsInfoItemText>
                </ProductDetailsInfoItem>
              </ProductDetailsInfoContainer>
              <ProductPurchaseInfo
                id={id}
                price={`$${price}`}
                status={status}
                product={product}
                renderAction={(orderItem: Product) => (
                  <AddToCart orderItemId={orderItem.id} />
                )}
              />
            </>
          )}
        </ProductDetailsContent>
      </ProductDetailsContainer>
      <Footer />
    </MainLayout>
  );
};

export default ProductDetails;
