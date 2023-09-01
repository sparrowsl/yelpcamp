import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import prisma from "./utils/prisma.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("home"));

app.get("/campgrounds", async (req, res) => {
	const campgrounds = await prisma.campground.findMany();

	res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
	const campground = await prisma.campground.findUnique({ where: { id: req.params.id } });

	res.render("campgrounds/campground", { campground });
});

app.listen(port, () => console.log("Serving on ::3000"));
