import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Select, SelectItemType } from 'shared/ui';
import { addItemToOrder } from 'entities/order/model';
import { Product } from 'shared/api';
import { useOrderItemQuantityById } from 'entities/order/model';

const generateItems = (countInStock: number): SelectItemType[] =>
  new Array(countInStock)
    .fill(null)
    .map((_, index) => ({ title: `${index + 1}`, value: `${index + 1}` }));

interface Props {
  orderItem: Product;
  readonly?: boolean;
}

export const ChangeOrderQuantity = ({ orderItem, readonly }: Props): ReactElement => {
  const dispatch = useDispatch();
  const orderQantity = useOrderItemQuantityById(orderItem.id);

  const onChange = (_: string, value: string): void => {
    dispatch(
      addItemToOrder({
        orderItemId: orderItem.id,
        count: parseInt(value),
        replaceCount: true,
        errorHandler: (message: string) => toast.error(message),
        successAction: () => {
          toast.success('Product is updated in the cart');
        },
      }) as any
    );
  };

  return (
    <Select
      disabled={readonly}
      items={generateItems(orderItem.countInStock)}
      name='orderQuantity'
      value={String(orderQantity)}
      handleChange={onChange}
    />
  );
};
