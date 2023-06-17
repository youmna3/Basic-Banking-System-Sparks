"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const TransferController_1 = __importDefault(require("../controllers/TransferController"));
const router = express_1.default.Router();
router.post('/transfer', TransferController_1.default.sendMoney);
router.post('/account', TransferController_1.default.getCustomerTransfer);
module.exports = router;
