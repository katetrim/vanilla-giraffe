import { Client } from "pg";

export class PostgresDb {
  constructor() {
    this.client = null;
  }

  async connectToDatabase() {
    // Create a PostgreSQL client
    this.client = new Client({
      user: "postgres",
      host: "localhost",
      database: "meal-selector",
      password: "password",
      port: 5432, // Default PostgreSQL port
    });

    // Connect to the database
    this.client.connect().then(() => {
      console.log("Connected to PostgreSQL");
    });
  }

  async insertNewUser(email, password) {
    const query = "INSERT INTO users (email, password) VALUES ($1, $2)";
    const values = [email, password];
    if (!this.checkForUser(email)) {
      return false;
    }

    this.client.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting row:", err);
      } else {
        console.log("Row inserted successfully");
      }
    });
    return true;
  }
  async loginUser(email, password) {
    const query = "SELECT * FROM users WHERE email = ($1)";
    const values = [email];
    if (this.checkForUser(email)) {
      const res = await this.client.query(query, values);
      if (password == res.rows[0].password) {
        console.log("Password correct");
        return true;
      }
    }
    return false;
  }
}
