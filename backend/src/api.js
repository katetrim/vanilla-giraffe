import { PostgresDb } from "./database.js";
import { TokenManagement } from "./token-management.js";
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

const database = new PostgresDb();

database.connectToDatabase();

app.put("/login", async (req, res) => {
  try {
    const body = req.body;
    let success = await database.loginUser(body.userName, body.password);
    if(success){
      res.status(200).json({token: TokenManagement.generateToken(body.userName)});
    } else {  
      res.status(401);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const body = req.body;
    let success = await database.insertNewUser(body.userName, body.password)
    success ? res.status(200) : res.status(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add-meal",  async (req, res) => {
  try {
    const body = req.body;
    let success = await database.insertNewUser(body.userName, body.password);
    success ? res.status(200) : res.status(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
