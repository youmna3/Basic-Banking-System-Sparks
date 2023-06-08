import CustomerController from "../controllers/CustomerController";
import express from "express";

const router = express.Router();

router.post("/create", CustomerController.createCustomer);
router.get("/getcustomers", CustomerController.getAllCustomers);
router.get("/:customerId", CustomerController.getCustomer);
export = router;
