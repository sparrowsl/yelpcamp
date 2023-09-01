import prisma from "../utils/prisma.js";
import cities from "./cities.js";
import { descriptors, places } from "./helpers.js";

const randomItem = (/** @type {string[]} */ array) => array[Math.floor(Math.random() * array.length)];

(async function seedDb() {
	await prisma.campground.deleteMany({});

	for (let i = 0; i < 50; i++) {
		const randomIndex = Math.floor(Math.random() * cities.length);

		await prisma.campground.create({
			data: {
				description: "",
				price: 0,
				location: `${cities[randomIndex].city} ${cities[randomIndex].state}`,
				title: `${randomItem(descriptors)} ${randomItem(places)}`,
			},
		});
	}
})().then(() => prisma.$disconnect());
