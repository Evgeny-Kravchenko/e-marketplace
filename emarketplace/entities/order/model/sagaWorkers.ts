import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select } from 'redux-saga/effects';
import { setOrderItems } from 'entities/order/model';

import { axiosInstance } from 'shared/libs';
import { RootState } from 'app/store';

export function* handleAddToOrder(
  action: PayloadAction<{
    orderItemId: string;
    count: number;
    successAction?: () => void;
    errorHandler?: (message: string) => void;
    replaceCount?: boolean;
  }>
): any {
  const { data } = yield call(
    axiosInstance.get,
    `api/products/${action.payload.orderItemId}`
  );

  const state: RootState = yield select();

  if (!data.countInStock) {
    action.payload.errorHandler('Product is out of stock');
    return;
  }
  if (action.payload.replaceCount && data.countInStock >= action.payload.count) {
    yield put(
      setOrderItems({
        orderItems: state.order.orderItems.map((order) =>
          order.orderItem.id === data.id
            ? { ...order, count: action.payload.count }
            : order
        ),
      })
    );
    action.payload.successAction && action.payload.successAction();
    return;
  }
  if (action.payload.replaceCount && action.payload.count > data.countInStock) {
    action.payload.errorHandler('Product is out of stock');
    return;
  }
  const qantityInCart = state.order.orderItems.find(
    (item) => item.orderItem.id === data.id
  );
  if (qantityInCart) {
    if (qantityInCart.count + action.payload.count > data.countInStock) {
      action.payload.errorHandler('Product is out of stock');
      return;
    }
    yield put(
      setOrderItems({
        orderItems: state.order.orderItems.map((order) =>
          order.orderItem.id === data.id
            ? { ...order, count: order.count + action.payload.count }
            : order
        ),
      })
    );
    action.payload.successAction && action.payload.successAction();
  } else {
    yield put(
      setOrderItems({
        orderItems: [
          ...state.order.orderItems,
          {
            orderItem: data,
            count: action.payload.count,
          },
        ],
      })
    );
    action.payload.successAction && action.payload.successAction();
  }
}
