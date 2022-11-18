import React, { ReactElement } from 'react';
import Image from 'next/image';

import { Product } from 'shared/api';

import {
  ProductCardContainer,
  ProductCardImageContainer,
  ProductCardName,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardAddToCardBtn,
  ProductCardInfoContainer,
} from './ProductCardStyles';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props): ReactElement => {
  const { image, name, description, price } = product;
  return (
    <ProductCardContainer>
      <ProductCardImageContainer>
        <Image fill src={image} alt={name} />
      </ProductCardImageContainer>
      <ProductCardInfoContainer>
        <ProductCardName variant='h3'>{name}</ProductCardName>
        <ProductCardDescription variant='body1'>{description}</ProductCardDescription>
        <ProductCardPrice variant='body1'>${price}</ProductCardPrice>
        <ProductCardAddToCardBtn fullWidth variant='contained' color='secondary'>
          Add to cart
        </ProductCardAddToCardBtn>
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};
