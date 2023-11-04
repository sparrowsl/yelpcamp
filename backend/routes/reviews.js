import express from "express";
import prisma from "../prisma/prisma.js";
import { validateReview } from "../validations.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const campground = await prisma.campground.findUnique({
		// @ts-ignore
		where: { id: req.params.id },
		include: {
			reviews: {
				orderBy: { id: "desc" },
			},
		},
	});

	return res.status(200).json({ data: { campground } });
});

router.post("/", validateReview, async (req, res) => {
	const review = await prisma.review.create({ data: req.body });

	return res.status(201).json({ data: { review } });
});

router.delete("/:rev_id", async (req, res) => {
	await prisma.review.delete({ where: { id: req.params.rev_id } });

	return res.status(204).json({ data: null });
});

export default router;
