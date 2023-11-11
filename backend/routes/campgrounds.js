import express from "express";
import prisma from "../prisma/prisma.js";
import { validateCampground, verifyAuthToken, verifyCampgroundAccess } from "../middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const campgrounds = (await prisma.campground.findMany({ orderBy: { id: "desc" } })).flat();

	return res.status(200).json({ result: campgrounds.length, data: { campgrounds } });
});

router.get("/:id", async (req, res) => {
	const campground = await prisma.campground.findUnique({
		where: { id: req.params.id },
		include: {
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	if (!campground) return res.status(404).json({ message: "Campground not found!!" });

	return res.status(200).json({ data: { campground } });
});

router.post("/", verifyAuthToken, validateCampground, async (req, res) => {
	const campground = await prisma.campground.create({
		// @ts-ignore
		data: { ...req.body, user_id: req.user?.id },
	});

	return res.status(201).json({ data: { campground } });
});

router.patch(
	"/:id",
	verifyAuthToken,
	verifyCampgroundAccess,
	validateCampground,
	async (req, res) => {
		const campground = await prisma.campground.update({
			data: req.body,
			where: { id: req.params.id },
		});

		return res.status(200).json({ data: { campground } });
	}
);

router.delete("/:id", verifyAuthToken, verifyCampgroundAccess, async (req, res) => {
	const campground = await prisma.campground.delete({
		where: { id: req.params.id },
	});

	return res.status(204).json({ data: { campground } });
});

export default router;
