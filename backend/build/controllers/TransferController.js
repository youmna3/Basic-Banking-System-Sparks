"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Customer_1 = __importDefault(require("../models/Customer"));
const Transfer_1 = __importDefault(require("../models/Transfer"));
const sendMoney = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;
    try {
        const sender = yield Customer_1.default.findOne({
            account_number: senderAccountNumber,
        });
        const receiver = yield Customer_1.default.findOne({
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
        }
        else {
            const newSenderBalance = Number(sender.balance) - Number(amount);
            const newReceiverBalance = Number(receiver.balance) + Number(amount);
            yield Customer_1.default.findOneAndUpdate({ account_number: senderAccountNumber }, { balance: newSenderBalance });
            yield Customer_1.default.findOneAndUpdate({ account_number: receiverAccountNumber }, { balance: newReceiverBalance });
            const transfer = new Transfer_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                sender: sender._id,
                receiver: receiver._id,
                amount,
            });
            yield transfer.save();
            return res.status(200).json({ success: true, transfer });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const getCustomerTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account_number } = req.body;
    try {
        const customer = yield Customer_1.default.findOne({ account_number });
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        const transfers = yield Transfer_1.default.find({
            $or: [{ sender: customer._id }, { receiver: customer._id }],
        });
        // Return the transfers as a response
        res.status(201).json({ message: "Customer's transactions", transfers });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Internal server error' });
    }
});
exports.default = { sendMoney, getCustomerTransfer };
