import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Product as IProduct, Order } from 'shared/api/models';
import { axiosInstance, useHttpClient } from 'shared/libs';
import { AppDispatch } from 'app/store';

import { clearOrder } from './order';

export const addItemToOrder = createAsyncThunk(
  `order/addItemToOrder`,
  async (payload: {
    orderItemId: string;
    count: number;
    successAction?: () => void;
    errorHandler?: (message: string) => void;
    replaceCount?: boolean;
  }): Promise<{
    orderItemId: string;
    count: number;
    replaceCount?: boolean;
    orderItem: IProduct;
    successAction?: () => void;
    errorHandler?: (message: string) => void;
  }> => {
    const { data } = await axiosInstance.get(`api/products/${payload.orderItemId}`);
    return { ...payload, orderItem: data };
  }
);

export const usePlaceOrderAsync = (
  dispatch: AppDispatch
): UseMutationResult<Order, unknown, Omit<Order, 'user'>, unknown> => {
  const router = useRouter();
  const httpClient = useHttpClient();
  return useMutation(
    async (payload: Omit<Order, 'user'>) => {
      const { data } = (await httpClient.post('api/orders', payload)) as any;
      return data;
    },
    {
      onSuccess: (data: Order) => {
        toast.success('Orders are placed successfully');
        router.push(`/order/${data._id}`);
        dispatch(clearOrder());
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );
};
