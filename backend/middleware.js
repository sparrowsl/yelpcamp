import jwt from "jsonwebtoken";
import { campgroundSchema, reviewSchema, userSchema } from "./validations.js";
import prisma from "./prisma/prisma.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const verifyAuthToken = (req, res, next) => {
	let token = "";
	try {
		if (req.headers?.authorization && req.headers?.authorization.startsWith("Bearer")) {
			token = req.headers?.authorization.split(" ")[1];
		}

		const verified = jwt.verify(token, String(process.env.JWT_SECRET));
		if (!verified) return res.status(403).json({ message: "Invalid token" });

		// @ts-ignore
		req.user = verified;
		next();
	} catch (e) {
		return res.status(403).json({ message: "You must be logged in to access endpoint!" });
	}
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const verifyUserAccess = async (req, res, next) => {
	try {
		const review = await prisma.review.findUnique({
			where: { id: req?.params?.rev_id },
			select: { user_id: true },
		});

		// @ts-ignore
		if (!review || review?.user_id !== req?.user?.id) {
			return res.status(403).json({ message: "Invalid access" });
		}

		next();
	} catch (e) {
		return res.status(401).json({ message: "You don't have access for this operation!" });
	}
};

/**
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

/**
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

/**
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
