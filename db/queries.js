const pool = require("./pool");

async function allMovies() {
  const { rows } = await pool.query("SELECT * FROM Movies");
  return rows;
}

async function allGenres() {
  const { rows } = await pool.query("SELECT * FROM Genres");
  return rows;
}

module.exports = { allGenres, allMovies };
