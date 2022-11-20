import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Product } from 'shared/api';

export interface OrderState {
  orderItems: { orderItem: Product; count: number }[];
}

const initialState: OrderState = {
  orderItems: [],
};

export const orderModel = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItemToOrder: (
      state,
      action: PayloadAction<{ orderItem: Product; numInStock: number }>
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (!action.payload.numInStock) {
        return;
      }
      const qantityInCart = state.orderItems.find(
        (item) => item.orderItem.id === action.payload.orderItem.id
      );

      if (qantityInCart) {
        if (qantityInCart.count + 1 > action.payload.numInStock) {
          alert('Product is out of stock');
          return;
        }
        state.orderItems = state.orderItems.map((order) =>
          order.orderItem.id === action.payload.orderItem.id
            ? { ...order, count: order.count + 1 }
            : order
        );
      } else {
        state.orderItems.push({ orderItem: action.payload.orderItem, count: 1 });
      }
    },
    deleteItemFromOrder(state, action: PayloadAction<{ id: string }>) {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItem.id !== action.payload.id
      );
    },
  },
});

// selectors

export const useOrderCount = (): number =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (items) => items.reduce((acc, item) => acc + item.count, 0)
    )
  );

export const useOrderItems = (): { orderItem: Product; count: number }[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.order,
      (order) => order.orderItems
    )
  );

export const useIsOrderItemsEmpty = (): boolean =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (orderItems) => !orderItems.length
    )
  );

export const useOrderTotalPrice = (): number =>
  useSelector(
    createSelector(
      (state: RootState) => state.order.orderItems,
      (items) =>
        items.reduce(
          (acc, item) => acc + item.count * parseFloat(item.orderItem.price),
          0
        )
    )
  );

// Action creators are generated for each case reducer function
export const { addItemToOrder, deleteItemFromOrder } = orderModel.actions;
export const reducer = orderModel.reducer;
