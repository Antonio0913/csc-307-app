// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  function removeOneCharacter(userId) {
    delUser(userId)
      .then((response) => {
        if (response.ok) {
          // Delete was successful on the backend, now update the frontend state
          const updated = characters.filter((character) => character._id !== userId);
          setCharacters(updated);
        } else {
          // Handle errors or unsuccessful deletion attempts (e.g., user not found)
          console.error("Failed to delete user");
          response.text().then((text) => console.error(text));
        }
      })
      .catch((error) => {
        // Network or other error
        console.error("Error deleting user:", error);
      });
}
  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          response.json().then((updatedPerson) => {
            setCharacters((characters) => [...characters, updatedPerson]);
          });
        } else {
          console.log("Failed to create the user:", response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function delUser(userId) {
    const promise = fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return promise;
  }
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
