import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  status: 'NEW' | 'PROCESSING' | 'DELIVERED';
  createdAt: Date;
}

const OrderProductSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
}, { _id: false });

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [OrderProductSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['NEW', 'PROCESSING', 'DELIVERED'], default: 'NEW' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);