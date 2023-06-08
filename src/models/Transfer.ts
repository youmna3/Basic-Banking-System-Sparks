import mongoose, { Document, Schema } from "mongoose";

export interface ITransfer {
  sender: string;
  receiver: string;
  amount: number;
}
export interface ITransferModel extends ITransfer, Document {}

const TransferShema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model<ITransferModel>("Transfer", TransferShema);
