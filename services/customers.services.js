const mongo = require("../mongo");
// let customers = [
//   {
//     customerName: "Zoro",
//     date: "20/10/21",
//     startTime: 1400,
//     endTime: 1500,
//     roomId: 1,
//   },
// ];

const services = {
  async getCustomers(req, res) {
    try {
      //const posts = await mongo.db.collection("posts").find().toArray();
      //const customers = await mongo.customers.find().toArray() -to get all customers details

      //getting all customer details who have booked along with smalldetail about room
      const customers = await mongo.customers
        .aggregate([
          {
            $lookup: {
              from: "hotels",
              localField: "roomId",
              foreignField: "id",
              as: "roomDetails",
            },
          },
          {
            $project: {
              _id: 0,
              customerName: 1,
              startTime: 1,
              endTime: 1,
              date: 1,
              "roomDetails.roomName": 1,
            },
          },
        ])
        .toArray();
      res.send(customers);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  async createCustomer(req, res) {
    try {
      const detail = await mongo.customers
        .find({
          roomId: req.body.roomId,
          startTime: req.body.startTime,
          date: req.body.date,
        })
        .toArray();

      //if match exists
      if (detail.length >= 1) {
        res.send({ message: "Sorry room already booked at this time slot!" });
      } else {
        //if match doesn't exist then we allow booking
        const customer = await mongo.customers.insertOne(req.body);
        res.send(customer);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
module.exports = services;
