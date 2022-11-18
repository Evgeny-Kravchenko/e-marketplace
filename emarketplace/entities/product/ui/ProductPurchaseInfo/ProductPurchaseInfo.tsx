import React, { ReactElement } from 'react';

import { Box } from '@mui/material';

import {
  ProductPurchaseInfoContainer,
  ProductPurchaseInfoList,
  ProductPurchaseInfoItem,
  ProductPurchaseInfoItemText,
} from './ProductPurchaseInfoStyles';

interface Props {
  id: string;
  price: string;
  status: string;
  renderAction?: (id: string) => ReactElement;
}

export const ProductPurchaseInfo = ({
  id,
  price,
  status,
  renderAction,
}: Props): ReactElement => {
  return (
    <ProductPurchaseInfoContainer component='section' elevation={3}>
      <ProductPurchaseInfoList dense>
        <ProductPurchaseInfoItem>
          <ProductPurchaseInfoItemText>Price</ProductPurchaseInfoItemText>
          <ProductPurchaseInfoItemText>{price}</ProductPurchaseInfoItemText>
        </ProductPurchaseInfoItem>
        <ProductPurchaseInfoItem>
          <ProductPurchaseInfoItemText>Status</ProductPurchaseInfoItemText>
          <ProductPurchaseInfoItemText>{status}</ProductPurchaseInfoItemText>
        </ProductPurchaseInfoItem>
      </ProductPurchaseInfoList>
      {renderAction && <Box sx={{ mt: 2 }}>{renderAction(id)}</Box>}
    </ProductPurchaseInfoContainer>
  );
};
