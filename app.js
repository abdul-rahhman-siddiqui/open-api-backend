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
app.use(cors({ origin: "*" })); // Allow all origins on Vercel
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/report", reportRoute);
app.use("/api/clear", clearRoute);
app.use("/api/rag", ragRoutes);

// MongoDB connect only once
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Export the app for Vercel to use as a serverless function
export default app;

// Local development only
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
