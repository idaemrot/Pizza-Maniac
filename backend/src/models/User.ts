import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  address?: string;
  role: 'User' | 'Admin';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
});

export default mongoose.model<IUser>('User', UserSchema);