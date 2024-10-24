const db = require("../db/queries");

async function getAllMovies() {
  const movies = await db.fetchMovies();
}

async function getMoviesByCategory(category) {
  const movies = await db.fetchMovieByCategory(category);
}

module.exports = {
  getAllMovies,
  getMoviesByCategory,
};
