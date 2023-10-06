import express from "express";
import cors from "cors";
import campgroundRoutes from "./routes/campgrounds.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json({ status: "success", message: "campgrounds API" }));

app.use("/api/v1/campgrounds", campgroundRoutes);
app.use("/api/v1/campgrounds/:id/reviews", reviewRoutes);

app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
