import express from 'express';
import TransferController from '../controllers/TransferController';
const router = express.Router();

router.post('/transfer', TransferController.sendMoney);
router.get('/:accountNumber', TransferController.getCustomerTransfer);
export = router;
