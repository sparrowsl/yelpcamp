import { z } from "zod";

const campgroundSchema = z.object({
	title: z.string().min(1).trim(),
	location: z.string().min(1).trim(),
	price: z.number({ coerce: true }).min(1, { message: "Price must be greater than 0!!" }),
	description: z.string().min(1).trim(),
	image: z.string().min(1).trim(),
});

export const validateCampground = (req, res, next) => {
	try {
		req.body = campgroundSchema.parse(req.body);
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}

	next();
};

const reviewSchema = z.object({
	body: z.string().min(1).trim(),
	rating: z.number({ coerce: true }).min(1).max(5),
});

export const validateReview = (req, res, next) => {
	try {
		req.body = reviewSchema.parse(req.body);
	} catch (e) {
		const { fieldErrors: errors } = e.flatten();
		// return first error for each errors array
		return res.status(400).json({ message: Object.values(errors).map((err) => err[0])[0] });
	}

	next();
};
