import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";
import reportRoute from "./routes/reportRoute.js";
import clearRoute from "./routes/clearRoute.js";
import ragRoutes from "./routes/ragRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/report", reportRoute);
app.use("/api/clear", clearRoute);
app.use("/api/rag", ragRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server @${PORT}`)))
  .catch(console.error);
