import React, { ReactElement } from 'react';

import { Box } from '@mui/material';

import { Product } from 'shared/api';
import { Paper } from 'shared/ui';

import {
  ProductPurchaseInfoList,
  ProductPurchaseInfoItem,
  ProductPurchaseInfoItemText,
} from './ProductPurchaseInfoStyles';

interface Props {
  id: string;
  price: string;
  status: string;
  product: Product;
  renderAction?: (orderItem: Product) => ReactElement;
}

export const ProductPurchaseInfo = ({
  id,
  price,
  status,
  renderAction,
  product,
}: Props): ReactElement => {
  return (
    <Paper>
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
      {renderAction && <Box sx={{ mt: 2 }}>{renderAction(product)}</Box>}
    </Paper>
  );
};
