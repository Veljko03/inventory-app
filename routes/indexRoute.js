const express = require("express");
const router = express.Router();
const controller = require("../controllers/moviesContreoller");

router.get("/", controller.getAllGenres);

module.exports = router;
