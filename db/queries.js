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
  const a = await pool.query("SELECT * from genres where genre_id=$id;", [id]);
  console.log(a + " this is getGanre");
}

module.exports = { allGenres, allMovies, insertGenre, genre_id };
