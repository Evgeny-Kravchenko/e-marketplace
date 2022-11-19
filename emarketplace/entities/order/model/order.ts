import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export interface OrderState {
  orderItems: { id: string; count: number }[];
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
      action: PayloadAction<{ id: string; numInStock: number }>
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (!action.payload.numInStock) {
        return;
      }
      const qantityInCart = state.orderItems.find(
        (item) => item.id === action.payload.id
      );

      if (qantityInCart) {
        if (qantityInCart.count + 1 > action.payload.numInStock) {
          alert('Product is out of stock');
          return;
        }
        state.orderItems = state.orderItems.map((order) =>
          order.id === action.payload.id ? { ...order, count: order.count + 1 } : order
        );
      } else {
        state.orderItems.push({ id: action.payload.id, count: 1 });
      }
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

// Action creators are generated for each case reducer function
export const { addItemToOrder } = orderModel.actions;
export const reducer = orderModel.reducer;
