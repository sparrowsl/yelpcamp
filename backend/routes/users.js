import express from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma.js";
import { validateUser } from "../schemas.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { username: req.body.username },
		});

		if (!user || !(await bcrypt.compare(req.body.password, user?.password))) {
			return res.status(404).json({ status: "fail", message: "Invalid username and password!!" });
		}

		// TODO: return JWT
		return res.status(201).json({ status: "success", data: { user } });
	} catch (error) {
		return res.status(400).json({ status: "fail", message: "Email might already be in use!!" });
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

		return res.status(201).json({ status: "success", data: { user } });
	} catch (error) {
		return res.status(400).json({ status: "fail", message: "Email might already be in use!!" });
	}
});

router.delete("/:id", async (req, res) => {
	await prisma.user.delete({ where: { id: req.params.id } });

	return res.status(204).json({ status: "success", data: null });
});

export default router;
