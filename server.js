// server.js
// A simple Express.js backend for a Todo list API

const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

//database
const sqlite3 = require("sqlite3").verbose();

// Middleware to parse JSON requests
app.use(express.json());

// Middle ware to inlcude static content
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

// create db to store todo items
const db = new sqlite3.Database("todos.db", (err) =>{
  if(err){
      return console.error("Error opening database:", err.message);

  }
  console.log("Connected to the animals database")
});  

//create a table
db.run(`
  CREATE TABLE IF NOT EXISTS Todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    priority TEXT NOT NULL,
    isComplete INTEGER DEFAULT 0,
    isFun INTEGER DEFAULT 0
  )
`, (err) => {
  if (err) {
    return console.error("Error creating table:", err.message);
  }
  console.log("Todos table created (if it didn't already exist).");
});



// server index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all todo items
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM Todos", (err, rows) => {
    if (err) {
      return console.error("Error fetching data:", err.message);
    }
    res.json(rows) //send all todos as JSON
  });

});

// GET a specific todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  //const todo = todos.find(item => item.id === id);
  /*
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }

  */
  db.all("SELECT * FROM Todos WHERE id == ?", [id], (err, rows) => {
    if (err) {
      return console.error("Error fetching data:", err.message);
    }
    res.json(rows)
  });


});

// POST a new todo item
app.post('/todos', (req, res) => {

  const { name, priority = 'low', isComplete, isFun } = req.body;

  if (!name || !priority) {
    return res.status(400).json({ message: 'Name/priority is required' });
  }
/*
  const newTodo = {
    id: nextId++,
    name,
    priority,
    isComplete: false,
    isFun
  };
  
  //todos.push(newTodo);
  res.status(201).json(newTodo);

*/

  const insertQuery = `
  INSERT INTO Todos (name, priority, isComplete, isFun)
  VALUES (?, ?, ?, ?)
`;

db.run(insertQuery, [name, priority, isComplete, isFun], function(err) {
  if (err) {
    return console.error("Error inserting Todo:", err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
  res.send("Todo added")
});

});

//----------------------------------------------------------------

// DELETE a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.run("DELETE FROM Todos WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Error deleting data:", err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    res.json({ message: `Todo item ${id} deleted successfully.` });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Todo API server running at http://localhost:${port}`);
});