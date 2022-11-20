import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { orderModel } from 'entities/order';

interface Props {
  id: string;
}

export const DeleteFromCart = ({ id }: Props): ReactElement => {
  const dispatch = useDispatch();

  const onDelete = (): void => {
    dispatch(orderModel.deleteItemFromOrder({ id }));
  };

  return (
    <IconButton onClick={onDelete}>
      <ClearIcon />
    </IconButton>
  );
};
