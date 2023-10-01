import express from "express";
import cors from "cors";
import { z } from "zod";
import prisma from "./prisma/prisma.js";

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

const validateCampground = (req, res, next) => {
	const campgroundSchema = z.object({
		title: z.string().min(1).trim(),
		location: z.string().min(1).trim(),
		price: z.number({ coerce: true }).min(1, { message: "Price must be greater than 0!!" }),
		description: z.string().min(1).trim(),
		image: z.string().min(1).trim(),
	});

	try {
		req.body = campgroundSchema.parse(req.body);
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}

	next();
};

app.post("/api/v1/campgrounds", validateCampground, async (req, res) => {
	const campground = await prisma.campground.create({ data: req.body });

	return res.status(201).json({ status: "success", data: { campground } });
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
