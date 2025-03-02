import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import * as cheerio from "cheerio";  // ✅ Correct way to import

//app is express server
const app = express();
const PORT = 4000;

//database connection triggered
connectDB();
//we are registering cors - Cross Origin Resource Sharing - This allow our server to respond to our frontend requests
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Middleware - is a logic which executes before the backend
app.use(express.json());//{key:value}
app.use(bodyParser.urlencoded({ extended: false }));//name=hmg

// Adding 2 routes
app.use("/api/v1", transactionRoutes);//all end points related to credit/debit transactions
app.use("/api/auth", userRoutes);//this all end points related to users -> login, signup
// API route to fetch product price


app.get("/", (req, res) => {
  res.send("FinManager Server is working");
});


