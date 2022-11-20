import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { Select, SelectItemType } from 'shared/ui';
import { addItemToOrder } from 'entities/order/model';
import { Product } from 'shared/api';
import { useOrderItemQuantityById } from 'entities/order/model';

const items: SelectItemType[] = new Array(20)
  .fill(null)
  .map((_, index) => ({ title: `${index + 1}`, value: `${index + 1}` }));

interface Props {
  orderItem: Product;
}

export const ChangeOrderQuantity = ({ orderItem }: Props): ReactElement => {
  const dispatch = useDispatch();
  const orderQantity = useOrderItemQuantityById(orderItem.id);

  const onChange = (name: string, value: string): void => {
    dispatch(
      addItemToOrder({
        orderItem,
        numInStock: orderItem.countInStock,
        count: parseInt(value),
        replaceCount: true,
      })
    );
  };

  return (
    <Select
      items={items}
      name='orderQuantity'
      value={String(orderQantity)}
      handleChange={onChange}
    />
  );
};
