const router = require("express").Router();
const services = require("../services/customers.services");

//get all customer details
router.get("/", services.getCustomers);

//create a customer
router.post("/", services.createCustomer);

module.exports = router;
