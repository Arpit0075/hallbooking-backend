const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
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
