import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/booking.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URL);
     useNewUrlParser:true;
      useUnifiedTopology:true;
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});