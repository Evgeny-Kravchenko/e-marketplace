import React, { ReactElement, PointerEvent } from 'react';
import { useDispatch } from 'react-redux';

import { addItemToOrder } from 'entities/order/model';

import { Button } from '@mui/material';

interface Props {
  id: string;
  numInStock: number;
}

export const AddToCart = ({ id, numInStock }: Props): ReactElement => {
  const dispatch = useDispatch();

  const onAddToCart = (e: PointerEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(addItemToOrder({ id, numInStock }));
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
