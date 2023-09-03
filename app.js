import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import prisma from "./utils/prisma.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("home"));

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await prisma.campground.findMany();

  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await prisma.campground.findUnique({
    where: { id: req.params.id },
  });

  res.render("campgrounds/campground", { campground });
});

app.delete("/campgrounds", async (req, res) => {
  await prisma.campground.delete({
    where: { id: req.body.id },
  });

  res.redirect(`/campgrounds`);
});

app.post("/campgrounds", async (req, res) => {
  const { title, location } = req.body;
  const campground = await prisma.campground.create({
    data: { location, title, price: 0, description: "" },
  });

  res.redirect(`/campgrounds/${campground.id}`);
});

app.listen(port, () => console.log("Serving on ::3000"));
