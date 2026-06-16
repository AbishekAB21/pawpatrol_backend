const express = require("express"); // Imports Express framework

const users = [];

const app = express(); // Creates an instance of the Express application

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body; // Extracts username, email, and password from the request body

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" }); // Returns a 400 error if any field is missing
  }

  const existingUser = users.find((user) => user.email === email); // Checks if a user with the same email already exists

  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" }); // Returns a 400 error if the email is already registered
  }

  const newUser = { username, email, password }; // Creates a new user object

  users.push(newUser); // Adds the new user to the users array

  res.status(201).json({
    message: "User registered successfully",

    user : {
      username: newUser.username,
      email: newUser.email,
    },
  });

}); // Defines a POST route for user signup

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
