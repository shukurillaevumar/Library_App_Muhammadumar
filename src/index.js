const express = require("express");
const bodyParser = require("body-parser");
const BookRouter = require("./routes/books.route");
const UsersRouter = require("./routes/users.route");
const dbConnect = require("./database/database.service");

const app = express();
dbConnect();
app.use(bodyParser.json());
app.use("/books", BookRouter);
app.use("/users", UsersRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
});