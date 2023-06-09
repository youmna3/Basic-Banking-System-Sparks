import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer {
  name: string;
  email: string;
  account_number: string;
  balance: number;
}

export interface ICustomerModel extends ICustomer, Document {}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    account_number: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model<ICustomerModel>("Customer", CustomerSchema);
