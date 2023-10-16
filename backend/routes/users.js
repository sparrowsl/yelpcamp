import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";
import { validateUser } from "../schemas.js";

const router = express.Router();

/** @param {object} payload */
function signToken(payload) {
	return jwt.sign(payload, String(process.env.JWT_SECRET), {
		expiresIn: String(process.env.JWT_EXPIRES_IN),
	});
}

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username.trim() || !password.trim()) {
		return res.status(400).json({ status: "fail", message: "Please provide email and password!!" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { username: req.body.username },
		});

		if (!user || !(await bcrypt.compare(req.body.password, user?.password))) {
			return res.status(401).json({ status: "fail", message: "Invalid username and password!!" });
		}

		const token = signToken({ id: user.id });
		const { password, ...rest } = user;
		return res.status(201).json({ status: "success", token, data: { user: rest } });
	} catch (error) {
		return res.status(400).json({ status: "fail", message: "Invalid username and password!!" });
	}
});

router.post("/register", validateUser, async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, 12),
			},
		});

		const token = signToken({ id: user.id });
		const { password, ...rest } = user;
		return res.status(201).json({ status: "success", token, data: { user: rest } });
	} catch (error) {
		return res.status(400).json({ status: "fail", message: "Email might already be in use!!" });
	}
});

router.delete("/:id", async (req, res) => {
	await prisma.user.delete({ where: { id: req.params.id } });

	return res.status(204).json({ status: "success", data: null });
});

export default router;
