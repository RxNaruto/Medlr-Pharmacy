import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import pharmacyRouter from "./routes/pharmacy";
import medicineRouter from "./routes/medicine";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/pharmacy",pharmacyRouter);
app.use("/api/v1/medicine",medicineRouter);

app.listen(3000);