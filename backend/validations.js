import { z } from "zod";

export const campgroundSchema = z.object({
	title: z.string().min(1).trim(),
	location: z.string().min(1).trim(),
	price: z.number({ coerce: true }).min(1, { message: "Price must be greater than 0!!" }),
	description: z.string().min(1).trim(),
	image: z.string().min(1).trim(),
});

export const reviewSchema = z.object({
	body: z.string().min(1).trim(),
	rating: z.number({ coerce: true }).min(1).max(5),
	campground_id: z.string().trim().min(5),
	user_id: z.string().trim().min(5),
});

export const userSchema = z.object({
	username: z.string().trim().min(1),
	email: z.string().email(),
	password: z.string().trim().min(4),
});
