import React, { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Header, Footer } from 'widgets';
import { MainLayout } from 'shared/layouts';
import { getProducts, Product } from 'shared/api';
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
  return {
    paths: getProducts().data.map((product) => ({ params: { slug: product.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const products = getProducts();
  const product = products.data.find((item) => item.id === slug);

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
  const { id, name, image, brand, rating, numReviews, description, price, countInStock } =
    product;

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
              <ProductDetailsInfoItemText>Category: {name}</ProductDetailsInfoItemText>
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
            renderAction={(id: string) => <AddToCart id={id} />}
          />
        </ProductDetailsContent>
      </ProductDetailsContainer>
      <Footer />
    </MainLayout>
  );
};

export default ProductDetails;
