require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("Connected to DB..."))
.catch(() => console.log("Error while connecting to DB..."));

app.listen(PORT, (err) => {
    if(err) return console.log("Error : ", err.message);
    console.log(`Server listening on port ${PORT}...`);
});
