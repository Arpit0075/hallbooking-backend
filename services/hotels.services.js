const mongo = require("../mongo");
// let rooms = [
//   {
//     seats: 50,
//     amneties: [" AC ", "Bar", "Ball"],
//     price: 5000,
//     id: 1,
//     roomName: "small",
//   },
// ];

const services = {
  async getRooms(req, res) {
    try {
      //const rooms= await mongo.db.collection("hotels").find().toArray();
      //const rooms = await mongo.hotels.find().toArray(); --to find all the hotel room details

      //finding all room detail and customer info
      const rooms = await mongo.hotels
        .aggregate([
          {
            $lookup: {
              from: "customers",
              localField: "id",
              foreignField: "roomId",
              as: "customerDetails",
            },
          },
          {
            $project: {
              roomName: 1,
              _id: 0,
              "customerDetails.customerName": 1,
              "customerDetails.startTime": 1,
              "customerDetails.endTime": 1,
              "customerDetails.date": 1,
            },
          },
        ])
        .toArray();

      res.send(rooms);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  async createRoom(req, res) {
    try {
      const room = await mongo.hotels.insertOne(req.body);
      res.send({ ...req.body, _id: room.insertedId });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
module.exports = services;
