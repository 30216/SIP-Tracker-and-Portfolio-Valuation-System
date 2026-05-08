import express from 'express';
import dotenv from 'dotenv';

import createTables from './config/schema.js';
import investorRoute from './routes/investorRoutes.js';
import mutualRoute from './routes/fundRoutes.js';
import sipRoute from './routes/sipRoutes.js';
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());



console.log("JWT Secret Loaded:", process.env.JWT_SECRET ? "YES" : "NO");

await createTables();

app.use('/api/investors', investorRoute);
app.use('/api/funds', mutualRoute);
app.use('/api/sips', sipRoute);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});