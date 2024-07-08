import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import pharmacyRouter from "./routes/pharmacy";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/pharmacy",pharmacyRouter);

app.listen(3000);