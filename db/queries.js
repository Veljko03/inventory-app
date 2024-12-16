const pool = require("./pool");

async function allMovies() {
  const { rows } = await pool.query("SELECT * FROM Movies");
  return rows;
}

async function allGenres() {
  const { rows } = await pool.query("SELECT * FROM Genres");
  console.log("doing something");

  return rows;
}

async function insertGenre(genreName) {
  await pool.query("INSERT INTO genres (ganreName) VALUES ($1)", [genreName]);
}

async function getGenre(id) {
  console.log("Raaaaaaaaa");

  const a = await pool.query("SELECT * FROM Genres WHERE genre_id=$1", [id]);
  console.log(a);
  return a.rows[0];
}

module.exports = { allGenres, allMovies, insertGenre, getGenre };
