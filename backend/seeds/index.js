import prisma from "../prisma/prisma.js";
import cities from "./cities.js";
import { descriptors, places } from "./helpers.js";

const randomItem = (/** @type {string[]} */ array) =>
	array[Math.floor(Math.random() * array.length)];

(async function seedDb() {
	await prisma.campground.deleteMany({});

	for (let i = 0; i < 50; i++) {
		const randomIndex = Math.floor(Math.random() * cities.length);

		await prisma.campground.create({
			data: {
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptatum dicta laborum distinctio ab, sequi velit delectus quod porro quae.`,
				price: Math.floor(Math.random() * 30) + 10,
				location: `${cities[randomIndex].city} ${cities[randomIndex].state}`,
				title: `${randomItem(descriptors)} ${randomItem(places)}`,
				image: "https://source.unsplash.com/random/?campground",
				user_id: "clos2vpm400009w4fern2wudi",
			},
		});
	}
})().then(() => prisma.$disconnect());
