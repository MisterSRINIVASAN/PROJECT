const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config(); // Load environment variables from .env file

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/chat-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connection Successful");
})
.catch((err) => {
    console.error("DB Connection Error:", err.message);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ msg: "Something went wrong!", status: false });
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});
