import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine","ejs")

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/yelpcamp")
  .then(() => app.listen(port, () => console.log("Connected...")));

app.get("/", (req, res) => res.send("Hello YelpCamp!!!"))
