import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandelrs";
import notFound from "./app/middlewares/notFound";

import router from "./app/router";

const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};

app.get("/", test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
