import express from "express";
import cors from "cors";
import prisma from "./prisma/prisma.js";
import { validateCampground, validateReview } from "./schemas.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json({ status: "success", message: "campgrounds API" }));

app.get("/api/v1/campgrounds", async (req, res) => {
	const campgrounds = (await prisma.campground.findMany()).flat();

	return res.status(200).json({ status: "success", data: { campgrounds } });
});

app.get("/api/v1/campgrounds/:id", async (req, res) => {
	const campground = await prisma.campground.findUnique({
		where: { id: req.params.id },
	});

	if (!campground) return res.status(404).json({ message: "Campground not found!!" });

	return res.status(200).json({ status: "success", data: { campground } });
});

app.post("/api/v1/campgrounds", validateCampground, async (req, res) => {
	const campground = await prisma.campground.create({ data: req.body });

	return res.status(201).json({ status: "success", data: { campground } });
});

app.post("/api/v1/campgrounds/:id/reviews", validateReview, async (req, res) => {
	const review = await prisma.review.create({ data: req.body });

	return res.status(201).json({ status: "success", data: { review } });
});

app.get("/api/v1/campgrounds/:id/reviews", async (req, res) => {
	const reviews = await prisma.review.findMany({
		where: { campground_id: req.params.id },
		orderBy: { id: "desc" },
	});

	return res.status(201).json({ status: "success", data: { reviews } });
});

app.patch("/api/v1/campgrounds/:id", validateCampground, async (req, res) => {
	const campground = await prisma.campground.update({
		data: req.body,
		where: { id: req.params.id },
	});

	return res.status(200).json({ status: "success", data: { campground } });
});

app.delete("/api/v1/campgrounds/:id", async (req, res) => {
	const campground = await prisma.campground.delete({
		where: { id: req.params.id },
	});

	return res.status(204).json({ status: "success", data: { campground } });
});

app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
