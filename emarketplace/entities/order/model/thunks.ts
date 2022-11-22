import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product as IProduct } from 'shared/api/models';
import { axiosInstance } from 'shared/libs';

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
