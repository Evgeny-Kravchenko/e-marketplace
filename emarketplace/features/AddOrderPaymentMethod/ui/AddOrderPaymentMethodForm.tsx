import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { OrderPaymentMethodForm } from 'entities/order/ui';
import { PaymentMethod } from 'shared/api';
import { orderModel } from 'entities/order';

export const AddOrderPaymentMethodForm = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialState = orderModel.usePaymentMethod();
  const isDeliveryInfo = orderModel.useIsDeliverInfo();

  useEffect(() => {
    if (!isDeliveryInfo) {
      router.push('/shipping');
    }
  }, [isDeliveryInfo]);

  const form = useForm<PaymentMethod>({
    defaultValues: initialState,
    mode: 'onChange',
  });

  const onSubmit = async (data: PaymentMethod): Promise<void> => {
    dispatch(orderModel.savePaymentMethod(data));
    router.push('/placeorder');
  };

  return <OrderPaymentMethodForm form={form} onSubmit={onSubmit} />;
};
