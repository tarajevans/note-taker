const express = require('express');
const fs = require('fs');
const notes = require("./Develop/db/db.json")
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
let currentID = notes.length;
// const apiRoutes = require('./Develop/routes/apiRoutes');
// const htmlRoutes = require('./Develop/routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.delete("/api/notes/:id", (req, res) => {
  for (let i = 0; i < notes.length; i++){
    if (notes[i].id == req.params.id){
      notes.splice(i, "1");
      saveNotes();
      console.log('File successfully deleted from: db.json');
      return res.status(200).end();
    }
  }
})

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let newId = currentID + 1;
  currentID++;
  newNote["id"] = newId;
  notes.push(newNote);
  saveNotes();
  return res.status(200).end();
})

app.get("/api/notes", (req,res) => {
  return res.json(notes);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

function saveNotes() {
  fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("File successfully written to: db.json");
  });
}