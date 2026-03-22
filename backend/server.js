const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        res.json({ message: "Success", user: { id: user.id, name: user.name, email: user.email } });
    });
});

app.post('/api/auth/register', (req, res) => {
    const { email, password, name } = req.body;
    db.run("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, password, name], function(err) {
        if (err) return res.status(400).json({ error: "Email already exists" });
        res.json({ id: this.lastID, email, name });
    });
});

// Destination Routes
app.get('/api/destinations', (req, res) => {
    const { search, type } = req.query;
    let query = "SELECT * FROM destinations WHERE 1=1";
    let params = [];
    if (search) {
        query += " AND (name LIKE ? OR location LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }
    if (type && type !== 'All') {
        query += " AND type = ?";
        params.push(type.toUpperCase());
    }
    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/destinations/:id', (req, res) => {
    db.get("SELECT * FROM destinations WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Not found" });
        res.json(row);
    });
});

// Trips Routes
app.get('/api/trips/:userId', (req, res) => {
    const query = `
        SELECT trips.*, destinations.name as destName, destinations.location as destLoc, destinations.image as destImage 
        FROM trips 
        JOIN destinations ON trips.destinationId = destinations.id 
        WHERE trips.userId = ?
    `;
    db.all(query, [req.params.userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/trips', (req, res) => {
    const { userId, destinationId, travelers, startDate, endDate, status } = req.body;
    db.run(
        "INSERT INTO trips (userId, destinationId, travelers, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, destinationId, travelers, startDate, endDate, status || 'Planning'],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.delete('/api/trips/:id', (req, res) => {
    db.run("DELETE FROM trips WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
