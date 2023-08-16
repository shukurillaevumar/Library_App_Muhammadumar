const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://supermegaultracombocomputer:yoJS3IFk6gNLBsIq@cluster0.k90gqxe.mongodb.net/library";

const dbConnect = () => {
    mongoose.connect(dbUrl);
    const database = mongoose.connection;

    database.on("error", (error) => {
        console.log(error);
    });

    database.once("connected", () => {
        console.log("Database connected");
    });
}

module.exports = dbConnect;