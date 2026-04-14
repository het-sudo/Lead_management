import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import errorHandler from "./common/middlewares/errorMiddleware.js";

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);
app.use(errorHandler);

export default app;
