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
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, account_number, balance } = req.body;
    try {
        const customer = new Customer_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            name,
            email,
            account_number,
            balance,
        });
        yield customer.save();
        return res.status(201).json({ customer });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ err });
    }
});
const getCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.customerId;
    try {
        const customer = yield Customer_1.default.findById(customerId);
        return customer
            ? res.status(200).json({ customer })
            : res.status(500).json({ message: 'Customer not found' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
});
const getAllCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield Customer_1.default.find();
        return res.status(200).json({ customers });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
});
const updateCustomer = (req, res, next) => { };
exports.default = { createCustomer, getAllCustomers, getCustomer };
