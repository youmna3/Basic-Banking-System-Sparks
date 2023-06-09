import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";
import Transfer from "../models/Transfer";

const sendMoney = async (req: Request, res: Response, next: NextFunction) => {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;
  try {
    const sender: any = await Customer.findOne({
      account_number: senderAccountNumber,
    });
    const receiver = await Customer.findOne({
      account_number: receiverAccountNumber,
    });

    if (!receiver) {
      return res.status(400).json({ error: "Invalid account number" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    } else {
      const newSenderBalance = Number(sender.balance) - Number(amount);
      const newReceiverBalance = Number(receiver.balance) + Number(amount);

      await Customer.findOneAndUpdate(
        { account_number: senderAccountNumber },
        { balance: newSenderBalance }
      );
      await Customer.findOneAndUpdate(
        { account_number: receiverAccountNumber },
        { balance: newReceiverBalance }
      );

      const transfer = new Transfer({
        _id: new mongoose.Types.ObjectId(),
        sender: sender._id,
        receiver: receiver._id,
        amount,
      });

      await transfer.save();
      return res.status(200).json({ success: true, transfer });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getCustomerTransfer = async (req: Request, res: Response) => {
  const account_number = req.params.accountNumber;
  const customer = await Customer.findOne({ account_number });
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  const transfers = await Transfer.find({
    $or: [{ sender: customer._id }, { receiver: customer._id }],
  });
  // Return the transfers as a response
  res.json(transfers);
};

export default { sendMoney, getCustomerTransfer };
