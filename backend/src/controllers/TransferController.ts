import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/Customer';
import Transfer from '../models/Transfer';

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
      return res.status(400).json({ error: 'Invalid account number' });
    }
    if (sender.account_number === receiver.account_number) {
      return res.status(400).json({ error: 'Invalid account number' });
    }
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
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
        sender: sender.account_number,
        receiver: receiver.account_number,
        amount,
      });

      await transfer.save();
      return res.status(200).json({ success: true, transfer });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const getCustomerTransfer = async (req: Request, res: Response) => {
  const { account_number } = req.body;
  try {
    const customer = await Customer.findOne({ account_number });
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    const transfers = await Transfer.find({
      $or: [
        { sender: customer.account_number },
        { receiver: customer.account_number },
      ],
    });
    // Return the transfers as a response
    res.status(201).json({ message: "Customer's transactions", transfers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

export default { sendMoney, getCustomerTransfer };
