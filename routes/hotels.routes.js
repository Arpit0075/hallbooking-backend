const router = require("express").Router();
const services = require("../services/hotels.services");

//get all he room details
router.get("/", services.getRooms);

//create a room
router.post("/", services.createRoom);

module.exports = router;
