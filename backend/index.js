import express from "express";
import mysql from "mysql";
import cors from "cors";

const backend = express();
backend.use(cors());
backend.use(express.json());

// Calendar:
const todo_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorect3!",
  database: "todos",
});

backend.get("/todo", (req, res) => {
  const q = "SELECT * FROM todo";
  todo_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

backend.post("/todo", (req, res) => {
  const q =
    "INSERT INTO todo(`title`, `complete`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.complete,
  ];

  todo_db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.delete("/todo/:id", (req, res) => {
  const eventId = req.params.id;
  const q = " DELETE FROM todo WHERE id = ? ";

  todo_db.query(q, [eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.put("/todo/:id", (req, res) => {
  const eventId = req.params.id;
  const q =
    "UPDATE todo SET `title`= ?, `complete`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.complete,
  ];

  todo_db.query(q, [...values, eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.listen(8800, () => {
  console.log("Connected to backend.");
});
