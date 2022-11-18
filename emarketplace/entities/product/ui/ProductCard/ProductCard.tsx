import React, { ReactElement } from 'react';
import Image from 'next/image';

import { Product } from 'shared/api';

import {
  ProductCardContainer,
  ProductCardImageContainer,
  ProductCardName,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardInfoContainer,
} from './ProductCardStyles';

interface Props {
  product: Product;
  renderAction?: (id: string) => ReactElement;
}

export const ProductCard = ({ product, renderAction }: Props): ReactElement => {
  const { image, name, description, price, id } = product;
  return (
    <ProductCardContainer href={`product/${id}`}>
      <ProductCardImageContainer>
        <Image fill src={image} alt={name} />
      </ProductCardImageContainer>
      <ProductCardInfoContainer>
        <ProductCardName variant='h3'>{name}</ProductCardName>
        <ProductCardDescription variant='body1'>{description}</ProductCardDescription>
        <ProductCardPrice variant='body1'>${price}</ProductCardPrice>
        {renderAction && renderAction(id)}
      </ProductCardInfoContainer>
    </ProductCardContainer>
  );
};
