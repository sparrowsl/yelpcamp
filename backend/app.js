import express from "express";
import cors from "cors";
import prisma from "./prisma/prisma.js";

const app = express();
const port = process.env.PORT || 3000;

// app.set("view engine", "ejs");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("home"));

app.get("/api/v1/campgrounds", async (req, res) => {
	const campgrounds = await prisma.campground.findMany();

	return res.status(200).json({ status: "success", data: { campgrounds } });
});

app.get("/api/v1/campgrounds/:id", async (req, res) => {
	const campground = await prisma.campground.findUnique({
		where: { id: req.params.id },
	});

	return res.status(200).json({ status: "success", data: { campground } });
});

app.delete("/api/v1/campgrounds", async (req, res) => {
	const campground = await prisma.campground.delete({
		where: { id: req.body.id },
	});

	return res.status(204).json({ status: "success", data: { campground } });
});

app.post("/api/v1/campgrounds", async (req, res) => {
	const { title, location } = req.body;
	const campground = await prisma.campground.create({
		data: { location, title, price: 0, description: "" },
	});

	return res.status(201).json({ status: "success", data: { campground } });
});

app.patch("/api/v1/campgrounds/:id", async (req, res) => {
	const { title, location } = req.body;
	const campground = await prisma.campground.update({
		data: { location, title },
		where: { id: req.params.id },
	});

	return res.status(200).json({ status: "success", data: { campground } });
});

app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
