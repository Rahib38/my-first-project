import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRouter } from "./app/modules/students/student.route";
import { UserRoutes } from "./app/modules/users/user.routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandelrs";
import notFound from "./app/middlewares/notFound";


const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1/students", StudentRouter);
app.use("/api/v1/users", UserRoutes);

const getController = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};

app.get("/", getController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
