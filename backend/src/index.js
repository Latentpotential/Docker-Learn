const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Docker Learning API");
});

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username FROM users ORDER BY id");

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const result = await pool.query(
            "SELECT id FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (result.rows.length > 0) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
            [username, password]
        );
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        if (err.code === "23505") {
            return res.status(409).json({ message: "Username is already taken" });
        }
        res.status(500).json({
            error: err.message
        });
    }
});



async function startServer() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);

        app.listen(3000, "0.0.0.0", () => {
            console.log("Server running on port 3000");
        });
    } catch (err) {
        console.error("Unable to initialize the database", err);
        process.exit(1);
    }
}

startServer();
