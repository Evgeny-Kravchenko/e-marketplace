import { takeLatest } from 'redux-saga/effects';
import { addItemToOrder } from 'entities/order/model';

import { handleAddToOrder } from 'entities/order/model';

export function* watcherSaga(): any {
  yield takeLatest(addItemToOrder.type, handleAddToOrder);
}
