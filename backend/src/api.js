import { PostgresDb } from "./database.js";
import { TokenManagement } from "./token-management.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import e from "express";

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
      res.status(200).json({accessToken: TokenManagement.generateToken(body.userName)});
    } else {  
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).end();
  }
});

app.post("/register", async (req, res) => {
  try {
    const body = req.body;
    let success = await database.insertNewUser(body.userName, body.password)
    if(success){
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).end();
  }
});

app.post("/add-meal", TokenManagement.verifyToken ,async (req, res) => {
  try {
    const body = req.body;
    let success = await database.insertMeal(body.mealName, body.userId);
    success ? res.status(200).end() : res.status(401).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.post("/remove-meal", TokenManagement.verifyToken ,async (req, res) => {
  try {
    const body = req.body;
    let success = await database.deleteMeal(body.mealId);
    success ? res.status(200).end() : res.status(401).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.get("/get-meals", TokenManagement.verifyToken ,async (req, res) => {
  try {
    const body = req.body;
    let meals = await database.getMeals(body.userId);
    res.status(200).json(meals);
  } catch (error) {
    console.error(error); 
    res.status(500).end();
  }
});

app.put("/logout", TokenManagement.verifyToken ,async (req, res) => {
  try {
    TokenManagement.revokeToken(req.headers['authorization']);
    res.status(200).end();
  } catch (error) {
    console.error(error); 
    res.status(500).end();
  }
});