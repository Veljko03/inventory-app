const db = require("../db/queries");

async function getAllMovies(req, res) {
  const movies = await db.allMovies();
}

async function getAllGenres(req, res) {
  const genres = await db.allGenres();
  res.render("index");
}

module.exports = {
  getAllMovies,
  getAllGenres,
};
