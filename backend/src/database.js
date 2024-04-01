import pkg from "pg";
const { Client } = pkg;

export class PostgresDb {
  constructor() {
    this.client = null;
  }

  async connectToDatabase() {
    console.log("connecting to database");
    // // Create a PostgreSQL client
    // this.client = new Client({
    //   user: "postgres",
    //   host: "localhost",
    //   database: "meal-selector",
    //   password: "password",
    //   port: 5432, // Default PostgreSQL port
    // });

    // // Connect to the database
    // this.client.connect().then(() => {
    //   console.log("Connected to PostgreSQL");
    // });
  }

  async insertNewUser(userName, password) {
    const query = "INSERT INTO users (userName, password) VALUES ($1, $2)";
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
      userInfo = res.rows[0];
      if (password == userInfo.password) {
        userId = userInfo.id;
        console.log("Password correct");
        return true;
      }
    }
    return false;
  }

  async checkForUser(userName) {
    const query = "SELECT * FROM users WHERE userName = ($1)";
    const values = [userName];
    const res = await this.client.query(query, values);
    if (res.rows.length == 0) {
      console.log("Email not found");
      return false;
    }
    return true;
  }

  async insertMeal(meal) {
    const query = "INSERT INTO meals () VALUES ($1, $2)";
    const values = [1, idea];

    this.client.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting row:", err);
      } else {
        console.log("Row inserted successfully");
      }
    });
  }
}
