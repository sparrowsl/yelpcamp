import express from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma.js";
import { signToken } from "../utils.js";
import { validateUser } from "../middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { username: req.body.username },
		});

		if (!user || !(await bcrypt.compare(req.body.password, user?.password))) {
			return res.status(400).json({ message: "Invalid username and password!!" });
		}

		const token = signToken({ id: user.id });
		const { password, ...rest } = user;
		return res.status(200).json({ token, data: { user: rest } });
	} catch (error) {
		return res.status(400).json({ message: "Invalid username and password!!" });
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
		return res.status(201).json({ token, data: { user: rest } });
	} catch (error) {
		return res.status(400).json({ message: "Email might already be in use!!" });
	}
});

router.delete("/:id", async (req, res) => {
	await prisma.user.delete({ where: { id: req.params.id } });

	return res.status(204).json({ data: null });
});

export default router;
