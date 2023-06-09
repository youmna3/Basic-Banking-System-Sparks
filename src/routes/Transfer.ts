import express from "express";
import TransferController from "../controllers/TransferController";
const router = express.Router();

router.post("/transfer", TransferController.sendMoney);

export = router;
