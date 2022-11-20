import React, { ReactElement } from 'react';

import { Typography, Box } from '@mui/material';

import { Paper } from 'shared/ui';

interface Props {
  orderCount: number;
  totalPrice: number;
  renderAction?: () => ReactElement;
}

export const OrdersResult = ({
  renderAction,
  orderCount,
  totalPrice,
}: Props): ReactElement => {
  return (
    <Paper>
      <Typography variant='body1' sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
        Subtotal({orderCount}): ${totalPrice}
      </Typography>
      {renderAction && <Box sx={{ mt: 2 }}>{renderAction()}</Box>}
    </Paper>
  );
};
