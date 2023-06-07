import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";

const createCustomer = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, account_number, balance } = req.body;
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    account_number,
    balance,
  });
  return customer
    .save()
    .then((customer) => res.status(201).json({ customer }))
    .catch((err) => res.status(500).json({ err }));
};
const getCustomer = (req: Request, res: Response, next: NextFunction) => {
  const customerId = req.params.customerId;
  return Customer.findById(customerId)
    .then((customer) =>
      customer
        ? res.status(200).json({ customer })
        : res.status(500).json({ message: "Customer not found" })
    )
    .catch((err) => res.status(500).json({ err }));
};
const getAllCustomers = (req: Request, res: Response, next: NextFunction) => {
  return Customer.find()
    .then((customers) => res.status(200).json({ customers }))
    .catch((err) => res.status(500).json({ err }));
};
const updateCustomer = (req: Request, res: Response, next: NextFunction) => {};
export default { createCustomer, getAllCustomers };
