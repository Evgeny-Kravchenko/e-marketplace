import React, { ReactElement } from 'react';

import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

import { Paper } from 'shared/ui';

interface Props {
  itemsPrice: number;
  tax: number;
  shipping: number;
  total: number;
  renderAction?: () => ReactElement;
}

export const OrderSummary = ({
  itemsPrice,
  tax,
  shipping,
  total,
  renderAction,
}: Props): ReactElement => {
  return (
    <Paper>
      <Typography variant='h3' sx={{ fontSize: '2rem' }}>
        Order Summary
      </Typography>
      <List dense>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '1.6rem' } }}>
            Items
          </ListItemText>
          <ListItemText
            sx={{ textAlign: 'right', '& .MuiTypography-root': { fontSize: '1.6rem' } }}
          >
            ${itemsPrice}
          </ListItemText>
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '1.6rem' } }}>
            Tax
          </ListItemText>
          <ListItemText
            sx={{ textAlign: 'right', '& .MuiTypography-root': { fontSize: '1.6rem' } }}
          >
            ${tax}
          </ListItemText>
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '1.6rem' } }}>
            Shipping
          </ListItemText>
          <ListItemText
            sx={{ textAlign: 'right', '& .MuiTypography-root': { fontSize: '1.6rem' } }}
          >
            ${shipping}
          </ListItemText>
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText sx={{ '& .MuiTypography-root': { fontSize: '1.6rem' } }}>
            Total
          </ListItemText>
          <ListItemText
            sx={{ textAlign: 'right', '& .MuiTypography-root': { fontSize: '1.6rem' } }}
          >
            ${total}
          </ListItemText>
        </ListItem>
      </List>
      {renderAction && renderAction()}
    </Paper>
  );
};
