import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRouter } from "./app/modules/students/student.route";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1/students", StudentRouter);

const getController = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};

app.get("/", getController);

export default app;
