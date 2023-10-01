import { z } from "zod";

export const validateCampground = (req, res, next) => {
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
