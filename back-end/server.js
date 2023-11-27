const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors);
dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully!");
    app.listen(process.env.PORT || 8000);
  })
  .catch((error) => {
    console.log("error" + error);
  });

// app.get("/", (req, res) => {
//   res.send("Running");
// });

app.use(userRoute);
