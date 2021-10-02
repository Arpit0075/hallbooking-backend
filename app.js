const express = require("express");
const mongo = require("./mongo");
const hotelsRoutes = require("./routes/hotels.routes");
const customersRoutes = require("./routes/customers.routes");
const app = express();
const port = process.env.PORT || 3001;

async function loadApp() {
  try {
    //mongodb connect
    await mongo.connect();

    //middleware to parse request body into JSON
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello World");
    });
    //routes
    app.use("/rooms", hotelsRoutes);
    app.use("/customers", customersRoutes);

    //server status
    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}
loadApp();
