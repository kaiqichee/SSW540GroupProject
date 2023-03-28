import express from "express";
import cors from "cors";
const app = express();
import configRoutes from "./routes/index.js";

app.use(cors())
app.use(express.json());
configRoutes(app);

app.listen(3001, () => {
    console.log("Your routes will be running on http://localhost:3001");
});