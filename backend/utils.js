import jwt from "jsonwebtoken";

/**
 * @param {import("jsonwebtoken").JwtPayload} payload
 * @returns {string}
 */
export function signToken(payload) {
	return jwt.sign(payload, String(process.env.JWT_SECRET), {
		expiresIn: String(process.env.JWT_EXPIRES_IN),
	});
}
