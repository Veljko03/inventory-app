const db = require("../db/queries");

async function getAllMovies(req, res) {
  const movies = await db.allMovies();
  res.render("movies", { arrMovies: movies });
}

async function getAllGenres(req, res) {
  const genres = await db.allGenres();
  //const movies = await db.allMovies();
  res.render("genres", { arrGenres: genres });
}
function getMainPage(req, res) {
  res.render("index");
}

async function addNewGenreGet(req, res) {
  res.render("newGenreForm");
}

async function addNewGenrePost(req, res) {
  const { genre } = req.body;
  if (genre) {
    await db.insertGenre(genre);
    console.log("added");
  } else {
    console.log("wrong credentials");
  }

  res.redirect("/genres");
}

async function addNewMovieGet(req, res) {
  const genres = await db.allGenres();
  res.render("newMovieForm", { gen: genres });
}

async function addMoviePost(req, res) {
  const { title, director, release_year, rating, description, genre } =
    req.body;
  await db.insertMovieWithGenre(
    title,
    director,
    release_year,
    rating,
    description,
    genre
  );
  res.redirect("/movies");
}

async function openGenre(req, res) {
  let { id } = req.params;

  const single = await db.getGenre(id);
  const moviesId = await db.getMoviesFromGenre(id);

  const movies = [];

  for (let index = 0; index < moviesId.length; index++) {
    const s = await getSingleMovie(moviesId[index].movie_id);
    movies.push(s);
  }

  res.render("genre", { g: single, mo: movies });
}

async function openMovie(req, res) {
  let { id } = req.params;

  const single = await db.getMovie(id);

  res.render("movie", { g: single });
}
async function getSingleMovie(id) {
  const single = await db.getMovie(id);
  //console.log(single, " singlee");

  return single;
}

async function deleteMoviesFormMoviesANDgenres(req, res) {
  let { id } = req.params;
  console.log(req, " iddddddddd");

  // await db.deleteMovie(id);
}

module.exports = {
  getAllMovies,
  getAllGenres,
  getMainPage,
  addNewGenreGet,
  addNewGenrePost,
  openGenre,
  openMovie,
  addNewMovieGet,
  addMoviePost,
  deleteMoviesFormMoviesANDgenres,
};
