import express from 'express';
import TransferController from '../controllers/TransferController';
const router = express.Router();

router.post('/transfer', TransferController.sendMoney);
router.post('/account', TransferController.getCustomerTransfer);
export = router;
