const db = require("../db/queries");

async function getAllMovies(req, res) {
  const movies = await db.allMovies();
  console.log(movies);
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

async function openGenre(req, res) {
  let { id } = req.params;
  //id += 1;
  console.log(id);

  const single = await db.getGenre(id);
  //   console.log(single, " singleeee");

  res.render("genre", { g: single });
}

module.exports = {
  getAllMovies,
  getAllGenres,
  getMainPage,
  addNewGenreGet,
  addNewGenrePost,
  openGenre,
};
