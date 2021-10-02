const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

//const url = "mongodb://localhost:27017";
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

module.exports = {
  //database
  db: null,

  //collections
  hotels: null,
  customers: null,

  async connect() {
    await client.connect(); // connecting to mongodb
    this.db = client.db("hotelBooking"); // selecting the database
    this.hotels = this.db.collection("hotels"); //selecting the collection from above database
    this.customers = this.db.collection("customers");
  },
};
