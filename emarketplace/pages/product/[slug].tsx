import React, { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { typicodeApi, Product } from 'shared/api';
import { ProductPurchaseInfo } from 'entities/product';
import { AddToCart } from 'features';

import {
  ProductDetailsLink,
  ProductDetailsContainer,
  ProductDetailsContent,
  ProductDetailsImageContainer,
  ProductDetailsInfoContainer,
  ProductDetailsInfoItem,
  ProductDetailsInfoItemText,
} from './styles';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await typicodeApi.getProducts();
  return {
    paths: response.data.map((product) => ({ params: { slug: product.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const response = await typicodeApi.getProducts();
  const product = response.data.find((item) => item.id === slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

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
  } = product;

  const status = countInStock > 0 ? 'In stock' : 'Unavailable';

  return (
    <MainLayout title={name}>
      <Header />
      <ProductDetailsContainer>
        <ProductDetailsLink href='/'>{`<-- Back to products`}</ProductDetailsLink>
        <ProductDetailsContent>
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
            renderAction={(id: string) => <AddToCart id={id} numInStock={countInStock} />}
          />
        </ProductDetailsContent>
      </ProductDetailsContainer>
      <Footer />
    </MainLayout>
  );
};

export default ProductDetails;
