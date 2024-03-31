import { PostgresDb } from "./database.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.use(bodyParser.json());

app.use(cors());

app.put("/login", async (req, res) => {
  try {
    const body = req.body;
    let success = await database.loginUser(body.userName, body.password);
    success ? res.status(200) : res.status(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/date-ideas", async (req, res) => {
  try {
    res.json("activityIdeas");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
