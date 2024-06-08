const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const JSONParser = bodyParser.json();
const server = "127.0.0.1:27017";
const db = "library";
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost:27017/library';

app.get('/', function (req, res) {
  res.send('Hello World from library');
});

mongoose.connect(mongoURI, {})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const BookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  status: String
});

const User = mongoose.model('User', UserSchema);
const Book = mongoose.model('Book', BookSchema);

app.post("/signup", (req, res) => {
  console.log("got data:::", req.body);
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser.save()
    .then(() => {
      console.log('Save User data at MongoDB');
      res.send("Sign-up is successful!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error signing up user");
    });
});

app.post("/signin", JSONParser, async (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  console.log("getting:", req.body);

  try {
    const user = await User.findOne({
      email: reqEmail,
      password: reqPassword
    });

    if (user) {
      console.log("sign-in successful");
      res.send("sign-in successful");
    } else {
      console.log("sign-in failed");
      res.status(404).send("sign-in failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during sign-in");
  }
});

app.post("/addbook", (req, res) => {
  console.log("got data:::", req);
  const newBook = new Book({
    name: req.body.name,
    price: req.body.price,
    status: "available"
  });

  newBook.save()
    .then(() => {
      console.log('Save Book data at MongoDB');
      res.send("Book added successfully!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error adding book");
    });
});

app.post("/take", JSONParser, async (req, res) => {
  try {
    const book = await Book.findOne({ name: req.body.name });

    if (!book) {
      res.status(404).send("Book not found");
      return;
    }

    if (book.status === "available") {
      book.status = "not available";
      await book.save();
      console.log("Book is now not available");
      res.send("Book is available");
    } else {
      console.log("Book is not available");
      res.send("Book is not available");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/deletebook", JSONParser, async (req, res) => {
  try {
    const result = await Book.deleteOne({ name: req.body.name });

    if (result.deletedCount === 1) {
      console.log("Book deleted");
      res.send("Book deleted successfully");
    } else {
      console.log("Book not found");
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/returnbook", JSONParser, async (req, res) => {
  try {
    const book = await Book.findOne({ name: req.body.name });

    if (!book) {
      res.status(404).send("Book not found");
      return;
    }

    if (book.status === "not available") {
      book.status = "available";
      await book.save();
      console.log("Book is now available");
      res.send("Book returned successfully");
    } else {
      console.log("Book was not taken");
      res.send("Book was not taken");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
