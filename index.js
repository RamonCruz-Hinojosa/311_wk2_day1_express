const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { users } = require("./state");

app.use(express.json());

/* BEGIN - create routes here */
app.get("/users", function (req, res) {
  return res.json(users);
});

app.get("/users/:id", function (req, res) {
  return res.json(users.filter((user) => user._id === Number(req.params.id)));
});

app.post("/users", function (req, res) {
  const id = users[users.length - 1]._id + 1;
  const user = req.body;
  user._id = id;
  users.push(user);
  return res.json(user);
});

app.put("/users/:id", function (req, res) {
  users.forEach((user, i) => {
    if (user._id === Number(req.params.id)) {
      users[i] = { ...user, ...req.body };
    }
  });
  return res.json(users);
});

app.delete("/users/:id", function (req, res) {
  users.forEach((user) => {
    if (user._id === Number(req.params.id)) {
      user.isActive = false;
    }
  });
  console.log(users);
  return res.send("deleted");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
