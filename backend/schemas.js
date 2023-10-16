import { z } from "zod";

const campgroundSchema = z.object({
	title: z.string().min(1).trim(),
	location: z.string().min(1).trim(),
	price: z.number({ coerce: true }).min(1, { message: "Price must be greater than 0!!" }),
	description: z.string().min(1).trim(),
	image: z.string().min(1).trim(),
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const validateCampground = (req, res, next) => {
	try {
		req.body = campgroundSchema.parse(req.body);
		next();
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}
};

const reviewSchema = z.object({
	body: z.string().min(1).trim(),
	rating: z.number({ coerce: true }).min(1).max(5),
	campground_id: z.string().trim().min(5),
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const validateReview = (req, res, next) => {
	try {
		req.body = reviewSchema.parse({ ...req.body, campground_id: req.params.id });
		next();
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}
};

const userSchema = z.object({
	username: z.string().trim().min(1),
	email: z.string().email(),
	password: z.string().trim().min(4),
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const validateUser = (req, res, next) => {
	try {
		req.body = userSchema.parse(req.body);
		next();
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}
};
