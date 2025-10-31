const express = require("express");
const connect = require("./connect");
const cors = require("cors");
const posts = require("./postRoutes");
const users = require("./userRoutes");

const cloudinaryRoutes = require("./cloudinaryRoutes.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(posts);
app.use(users);

app.use('/api', cloudinaryRoutes)


app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
