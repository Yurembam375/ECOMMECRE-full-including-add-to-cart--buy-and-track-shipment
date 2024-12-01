import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use the seed router for seeding data
app.use("/api/seed", seedRouter);

// Corrected route for products
app.use("/api/products", productRouter);  // Fixed typo here

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
