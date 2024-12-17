const pool = require("./pool");

async function allMovies() {
  const { rows } = await pool.query("SELECT * FROM Movies");
  return rows;
}

async function allGenres() {
  const { rows } = await pool.query("SELECT * FROM Genres");

  return rows;
}

async function insertGenre(genreName) {
  await pool.query("INSERT INTO genres (ganreName) VALUES ($1)", [genreName]);
}

async function insertMovieWithGenre(
  title,
  director,
  year,
  rating,
  description,
  genreName
) {
  try {
    const genreResult = await pool.query(
      "SELECT genre_id FROM Genres WHERE ganrename = $1",
      [genreName]
    );

    if (genreResult.rows.length === 0) {
      throw new Error(`Genre "${genreName}" does not exist. Cannot add movie.`);
    }

    const genreId = genreResult.rows[0].genre_id;

    // Dodaj film u tabelu Movies
    const movieResult = await pool.query(
      "INSERT INTO Movies (title, director, release_year, rating, description) VALUES ($1, $2, $3, $4, $5) RETURNING movie_id",
      [title, director, year, rating, description]
    );

    const movieId = movieResult.rows[0].movie_id;

    // Poveži film sa žanrom u tabeli MovieGenres
    await pool.query(
      "INSERT INTO MovieGenres (movie_id, genre_id) VALUES ($1, $2)",
      [movieId, genreId]
    );
  } catch (err) {
    console.error("Error adding movie with genre:", err.message);
  }
}

async function getGenre(id) {
  const a = await pool.query("SELECT * FROM Genres WHERE genre_id=$1", [id]);

  return a.rows[0];
}

async function getMoviesFromGenre(id) {
  const b = await pool.query(
    "SELECT movie_id FROM moviegenres WHERE genre_id=$1",
    [id]
  );
  return b.rows;
}

async function getMovie(id) {
  const a = await pool.query("SELECT * FROM movies WHERE movie_id=$1", [id]);
  //console.log(a.rows[0]);

  return a.rows[0];
}

async function deleteMovie(id) {
  //await pool.query("DELETE FROM movies WHERE movie_id=$1", [id]);
  // await pool.query("DELETE FORM moviegenres WHERE movie_id=$1", [id]);
}

module.exports = {
  allGenres,
  allMovies,
  insertGenre,
  getGenre,
  getMovie,
  insertMovieWithGenre,
  getMoviesFromGenre,
  deleteMovie,
};
