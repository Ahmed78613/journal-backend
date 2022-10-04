const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const journal = require("./routes/journal");

// middleware
app.use(cors());
app.use(bodyParser.json());

// default req
app.get("/", (req, res) => {
	res.send("Welcome to our Journal API");
});

// routes
app.use("/journal", journal);

module.exports = app;
