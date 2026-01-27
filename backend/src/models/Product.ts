import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  category: 'Pizza' | 'Drink';
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

const ProductSchema: Schema = new Schema({
  category: { type: String, enum: ['Pizza', 'Drink'], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);