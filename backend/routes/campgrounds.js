import express from "express";
import prisma from "../prisma/prisma.js";
import { validateCampground } from "../schemas.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const campgrounds = (await prisma.campground.findMany()).flat();

	return res.status(200).json({ status: "success", data: { campgrounds } });
});

router.get("/:id", async (req, res) => {
	const campground = await prisma.campground.findUnique({
		where: { id: req.params.id },
	});

	if (!campground) return res.status(404).json({ message: "Campground not found!!" });

	return res.status(200).json({ status: "success", data: { campground } });
});

router.post("/", validateCampground, async (req, res) => {
	const campground = await prisma.campground.create({ data: req.body });

	return res.status(201).json({ status: "success", data: { campground } });
});

router.patch("/:id", validateCampground, async (req, res) => {
	const campground = await prisma.campground.update({
		data: req.body,
		where: { id: req.params.id },
	});

	return res.status(200).json({ status: "success", data: { campground } });
});

router.delete("/:id", async (req, res) => {
	const campground = await prisma.campground.delete({
		where: { id: req.params.id },
	});

	return res.status(204).json({ status: "success", data: { campground } });
});

export default router;
