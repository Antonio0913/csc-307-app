import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());

app.use(express.json());


app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(500).send(err.message));
});


app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send(err.message));
});

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  userService
    .deleteUserById(userId)
    .then((deleted) => {
      if (deleted) {
        res.send("User deleted successfully.");
      } else {
        res.status(404).send("User not found.");
      }
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send(err.message);
    });
});


app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send(err.message));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
