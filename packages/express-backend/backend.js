import express from "express";
import cors from "cors";

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

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = generateId();
  users["users_list"].push(user);
  return user;
};

function generateId() {
  return Math.random().toString(36).substr(2, 6);
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  if (addedUser) {
    res.status(201).send(addedUser);
  } else {
    res.status(500).send("Error adding user");
  }
});

const deleteUserById = (userId) => {
  const index = users.users_list.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users.users_list.splice(index, 1);
    return true;
  }
  return false;
};

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  if (deleteUserById(userId)) {
    res.send("User deleted successfully.");
  } else {
    res.status(404).send("User not found.");
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
