const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api routes
app.get('/api/notes', (req, res) => {
    res.json(db);
}
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = db.length + 1;
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        res.json(db);
    });
}
);

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newDb = db.filter(note => note.id !== id);
    fs.writeFile('./db/db.json', JSON.stringify(newDb), (err) => {
        if (err) throw err;
        res.json(newDb);
    });
}
);

// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
}

);

function deleteNote (id) {
    return fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}



  









