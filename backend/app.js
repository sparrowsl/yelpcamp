import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import campgroundRoutes from "./routes/campgrounds.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json({ message: "campgrounds API" }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/campgrounds", campgroundRoutes);
app.use("/api/v1/campgrounds/:id/reviews", reviewRoutes);

app.use("*", (req, res) => res.status(404).json({ message: "Invalid API endpoint!!" }));

app.listen(port, () => console.log(`Serving on port:${port}`));
