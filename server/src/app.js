const express = require("express");
const app = express();
const cors = require("cors");
const wishRouter = require("./routes/wishRoute");
const userRouter = require("./routes/userRoute");
const personRouter = require("./routes/personRoute");

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use("/", wishRouter);
app.use("/", userRouter);
app.use("/", personRouter);

module.exports = app;