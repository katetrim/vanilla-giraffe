import pkg from "pg";
const { Client } = pkg;

export class PostgresDb {
  constructor() {
    this.client = null;
  }

  async connectToDatabase() {
    console.log("connecting to database");
    // Create a PostgreSQL client
    this.client = new Client({
      user: "db_access",
      host: "localhost",
      database: "meal_spin_app",
      password: "password",
      port: 5432, // Default PostgreSQL port
    });

    // Connect to the database
    this.client.connect().then(() => {
      console.log("Connected to PostgreSQL");
    });
  }

  async insertNewUser(userName, password) {
    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const values = [userName, password];
    if (!this.checkForUser(userName)) {
      return false;
    }

    this.client.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting row:", err);
        throw err;
      } else {
        console.log("Row inserted successfully");
      }
    });
    return true;
  }
  async loginUser(userName, password) {
    const query = "SELECT * FROM users WHERE userName = ($1)";
    const values = [userName];
    if (this.checkForUser(userName)) {
      const res = await this.client.query(query, values);
      let userInfo = res.rows[0];
      if (password == userInfo.password) {
        console.log("Password correct");
        return true;
      }
    }
    return false;
  }

  async checkForUser(userName) {
    const query = "SELECT * FROM users WHERE username = ($1)";
    const values = [userName];
    const res = await this.client.query(query, values);
    if (res.rows.length == 0) {
      console.log("User not found");
      return false;
    }
    return true;
  }

  async getUserFromId(userId) {
    const query = "SELECT * FROM users WHERE userId = ($1)";
    const values = [userId];
    const res = await this.client.query(query, values);
    if (res.rows.length == 0) {
      console.log("User not found");
      return null;
    }
    else {
      return res.rows[0].username;
    }
  }

  async insertMeal(mealName, userId) {
    const query = "INSERT INTO meals (mealname, userid) VALUES ($1, $2)";
    const values = [mealName, userId];

    this.client.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting row:", err);
        return false;
      } else {
        console.log("Row inserted successfully");
      }
    });
    return true;
  }

  async deleteMeal(mealId) {
    const query = "DELETE FROM meals WHERE mealid = $1";
    const values = [mealId];

    this.client.query(query, values, (err) => {
      if (err) {
        console.error("Error deleting row:", err);
        return false;
      } else {
        console.log("Row deleted successfully");
      }
    });
    return true;
  }
  async getMeals(userId) {
    const query = "SELECT * FROM meals WHERE userid = $1";
    const values = [userId];
    const res = await this.client.query(query, values);
    if (res.rows.length == 0) {
      console.log("No meals found");
      return {};
    }
    return res.rows;
  }
}
