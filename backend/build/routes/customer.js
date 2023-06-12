"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CustomerController_1 = __importDefault(require("../controllers/CustomerController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/create', CustomerController_1.default.createCustomer);
router.get('/getcustomers', CustomerController_1.default.getAllCustomers);
router.get('/:customerId', CustomerController_1.default.getCustomer);
module.exports = router;
