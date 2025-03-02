const mongoose = require('mongoose');
const cors = require('cors');
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@demo-foodiman-cluster.wof57sl.mongodb.net/item-db?retryWrites=true&w=majority&appName=demo-foodiman-cluster`
  )
  .then(console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("error", err));

// Routes
const itemRoutes = require('./api/routes/items');
app.use('/api/items', itemRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });