const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// MySQL configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SriSahi@22",
  database: "bookingAppointment",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  // Create the users table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Users table created or already exists");
  });
});

// Enable CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define a new route to fetch all user details
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching user details");
    } else {
      res.json(results);
    }
  });
});

// Define the /user route
app.post("/user", (req, res) => {
  const { name, email, phone } = req.body;
  const user = { name, email, phone };

  // Insert the user into the database
  connection.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the user");
    } else {
      res.send("User saved successfully");
    }
  });
});

// Define the /users/:id route for fetching a single user's details
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching user details");
      } else {
        if (result.length === 0) {
          res.status(404).send("User not found");
        } else {
          res.json(result[0]);
        }
      }
    }
  );
});

// Define the /users/:id route for updating a user's details
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  connection.query(
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating the user");
      } else {
        res.send("User updated successfully");
      }
    }
  );
});

// Define the /user/:id route for deleting a user
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "DELETE FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting the user");
      } else {
        res.send("User deleted successfully");
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});