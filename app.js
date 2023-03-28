import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";

import Campground from "./models/campground.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect("mongodb://localhost/yelpcamp")
	.then(() => app.listen(port, console.log("Connected...")));

app.get("/", (req, res) => res.render("home"));

app.get("/campgrounds", async (req, res) => {
	const campgrounds = await Campground.find();

	res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
	const campground = await Campground.findById(req.params.id);

	res.render("campgrounds/campground", { campground });
});
