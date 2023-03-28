import mongoose from "mongoose";

import Campground from "../models/campground.js";
import cities from "./cities.js";
import { descriptors, places } from "./helpers.js";

mongoose.connect("mongodb://localhost/yelpcamp").then(console.log("Connected..."));

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

(async function seedDb() {
	await Campground.deleteMany({});

	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * cities.length);

		await new Campground({
			location: `${cities[randomIndex].city} ${cities[randomIndex].state}`,
			title: `${randomItem(descriptors)} ${randomItem(places)}`,
		}).save();
	}
})().then(() => mongoose.connection.close());
