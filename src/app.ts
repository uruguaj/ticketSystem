import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors<Request>());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  const { hostname, method, path, ip, protocol } = req;
  res
    .cookie("working", true)
    .json(`${hostname}://${method} ${path} ip: ${ip} protocol: ${protocol}`);
});
app.get("/c", (req: Request, res: Response) => {
  res.json(true);
});

// Error handling middleware (optional)
app.use((err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
