import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
// import db from "./db/conn.mjs"

import records from "./routes/record.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
  res.location("/record").status(307).send("Pigeon got Lost").end();
});

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {  
  console.log(`Server is running on port: ${PORT}`);
});
