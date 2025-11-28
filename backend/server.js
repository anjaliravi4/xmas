const express = require("express");
const cors = require("cors");

const app = express();

// Allow all origins (for development)
app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.json({ message: "Backend is working!" });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
