const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const db = require('./db/db.json');
const PORT = process.env.PORT || 3000;





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

app.delete('/api/notes', (req, res) => {
    const newDb = [];
    fs.writeFile('./db/db.json', JSON.stringify(newDb), (err) => {
        if (err) throw err;
        res.json(newDb);
    });
}
);

app.delete('/', (req, res) => {
    const newDb = [];
    fs.writeFile('./db/db.json', JSON.stringify(newDb), (err) => {
        if (err) throw err;
        res.json(newDb);
    });
}
);

app.delete('/notes', (req, res) => {
    const newDb = [];
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);

app.delete('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
}
);

app.delete('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.delete('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.delete('/api/notes/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}
);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
}
);















  









