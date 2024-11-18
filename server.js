const express = require("express");
const app = express();
const PORT = 4000;
const dbConnection = require("./config/db");
const AuthRoutes = require("./routes/authRoutes");
const FileRoutes = require("./routes/fileRoutes");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/api/auth", AuthRoutes);
app.use("/api/file", FileRoutes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
