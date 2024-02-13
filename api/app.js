const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.connect("mongodb+srv://sanjelsarbada12:DAvjs0mD6NOilxcY@sarbada.owvqywb.mongodb.net/UserData");

const User = mongoose.model("User", {
  name: String,
  email: String,
  gender: String,
  country: String,
  languages: [String],
});

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });

});


app.post("/", async (req, res) => {
  const data = req.body;

  await User.create(data);
  return res.status(201).json({ message: "Successfully added." });
});

app.get('/:id', async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({ _id: id });
  return res.json({ user });
});


app.delete('/:id', async (req, res) => {
  let id = req.params.id;
  await User.deleteOne({ _id: id });
  return res.json({ message: 'user deleted' });
});

app.listen(3001, () => {
  console.log("Server is running at port 3001.");
});


