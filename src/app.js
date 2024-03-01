const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  const { hostname, method } = req;
  res
    .cookie("working", true)
    .cookie("request", method)
    .json(`Hi, thanks for visiting ${hostname}`);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
