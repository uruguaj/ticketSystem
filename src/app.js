import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  const { hostname, method, path, ip, protocol } = req;
  res
    .cookie("working", true)
    .json(`${hostname}://${method} ${path} ip: ${ip} protocol: ${protocol}`);
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

export default app;
