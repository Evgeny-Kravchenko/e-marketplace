import React, { ReactElement, PointerEvent } from 'react';

import { Button } from '@mui/material';

interface Props {
  id: string;
}

export const AddToCart = ({ id }: Props): ReactElement => {
  const onAddToCart = (e: PointerEvent<HTMLButtonElement>): void => {
    alert(`Add ${id} to cart`);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Button
      fullWidth
      variant='contained'
      color='secondary'
      sx={{ fontSize: '1.6rem' }}
      onClick={onAddToCart}
    >
      Add to cart
    </Button>
  );
};
