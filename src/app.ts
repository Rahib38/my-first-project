import cors from "cors";
import express, { Application } from "express";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", getController);

export default app;
