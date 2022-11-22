import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { OrderDelieveryAddressForm } from 'entities/order/ui/OrderDelieveryAddressForm';
import { DeliveiryAddress } from 'shared/api';
import { orderModel } from 'entities/order';

export const AddDelieveryAddressToOrderForm = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialState = orderModel.useOrderDelieveryAddress();

  const form = useForm<DeliveiryAddress>({
    defaultValues: initialState,
    mode: 'onChange',
  });

  const onSubmit = async (data: DeliveiryAddress): Promise<void> => {
    dispatch(orderModel.saveShippingAddress(data));
    router.push('/payment');
  };

  return <OrderDelieveryAddressForm form={form} onSubmit={onSubmit} />;
};
