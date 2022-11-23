import mongoose from 'mongoose';
import { Order as IOrder } from './models';
import { db } from 'shared/config';

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        count: { type: Number, required: true },
        orderItem: {
          id: { type: String, unique: true },
          name: { type: String, required: true },
          slug: { type: String, required: true, unique: true },
          category: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: String, required: true },
          brand: { type: String, required: true },
          rating: { type: Number, required: true, default: 0 },
          numReviews: { type: Number, required: true, default: 0 },
          countInStock: { type: Number, required: true, default: 0 },
          description: { type: String, required: true },
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      value: { type: String, required: true },
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;

export const getOrderById = async (id: string): Promise<IOrder> => {
  db.connect();
  const data = await (Order as any).findById(id).lean();
  db.disconnect();
  return data ? db.convertDocToObj(data) : null;
};
