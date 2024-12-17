const express = require("express");
const router = express.Router();
const controller = require("../controllers/moviesContreoller");

router.get("/", controller.getMainPage);
router.get("/movies", controller.getAllMovies);
router.get("/genres", controller.getAllGenres);
router.get("/newGenre", controller.addNewGenreGet);
router.post("/addGenre", controller.addNewGenrePost);
router.get("/genres/:id", controller.openGenre);
router.get("/movies/:id", controller.openMovie);
router.post("/newMovie", controller.addMoviePost);
router.get("/newMovie", controller.addNewMovieGet);
router.delete("/moviesDel/:id", controller.deleteMoviesFormMoviesANDgenres);
router.delete("/genreDel/:id", controller.deleteGenreWithAllMovies);

module.exports = router;
