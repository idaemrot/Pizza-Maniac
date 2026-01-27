import mongoose, { Document, Schema } from 'mongoose';

export interface ICartProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: ICartProduct[];
  totalAmount: number;
}

const CartProductSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
}, { _id: false });

const CartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: [CartProductSchema],
  totalAmount: { type: Number, required: true, default: 0 },
});

export default mongoose.model<ICart>('Cart', CartSchema);