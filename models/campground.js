import mongoose from "mongoose";

export const CampgroundSchema = new mongoose.Schema({
	title: String,
	price: String,
	description: String,
	location: String,
});

export default mongoose.model("Campground", CampgroundSchema);
