const express = require("express");
const router = express.Router();
const controller = require("../controllers/moviesContreoller");

router.get("/", controller.getMainPage);
router.get("/movies", controller.getAllMovies);
router.get("/genres", controller.getAllGenres);
router.get("/newGenre", controller.addNewGenreGet);
router.post("/newGenre", controller.addNewGenrePost);

module.exports = router;
