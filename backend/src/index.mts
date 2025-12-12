import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { loginRouter } from "./routes/loginRoute.mjs";
import { registerRouter } from "./routes/registerRoute.mjs";
import cookieParser from "cookie-parser";
import { meRouter } from "./routes/meRoute.mjs";
import { ownedBooksRouter } from "./routes/ownedBooksRoute.mjs";
import { requireAuth } from "./middleware/requireAuth.mjs";

dotenv.config();

const port = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL;
if (!dbUrl) throw new Error("no DB_URL in env file");

const app = express();

//middlewares
app.use(json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/me", meRouter);
app.use("/dashboard/new-book", requireAuth, ownedBooksRouter);

app.listen(port, async () => {
  try {
    await mongoose.connect(dbUrl, { dbName: "ReRead" });
    console.log(
      `API is up and running on port: ${port} & connected to MongoDB: ${mongoose.connection.name}`
    );
  } catch (error) {
    console.error(error);
  }
});
