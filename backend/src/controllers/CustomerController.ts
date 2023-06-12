import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/Customer';

const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, account_number, balance } = req.body;
  try {
    const customer = new Customer({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      account_number,
      balance,
    });
    await customer.save();
    return res.status(201).json({ customer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};
const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.params.customerId;
  try {
    const customer = await Customer.findById(customerId);
    return customer
      ? res.status(200).json({ customer })
      : res.status(500).json({ message: 'Customer not found' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ customers });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const updateCustomer = (req: Request, res: Response, next: NextFunction) => {};

export default { createCustomer, getAllCustomers, getCustomer };
