import mongoose from 'mongoose';
import { db } from 'shared/config';
import { Product as IProduct } from './models';

const productSchema = new mongoose.Schema<IProduct>(
  {
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
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;

export const getProducts = async (): Promise<IProduct[]> => {
  db.connect();
  const data = await (Product as any).find().lean();
  db.disconnect();
  return data.map(db.convertDocToObj);
};

export const getProductById = async (id: string): Promise<IProduct> => {
  db.connect();
  const data = await (Product as any).findOne({ id }).lean();
  db.disconnect();
  return data ? db.convertDocToObj(data) : null;
};
