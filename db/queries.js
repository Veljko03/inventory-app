const pool = require("./pool");

async function fetchMovies() {
  const { rows } = await pool.query("SELECT * FROM movie");
  return rows;
}
async function fetchCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function fetchMovieByCategory(categoryName) {
  return await pool.query(
    "SELECT movieName FROM movie JOIN category ON category_id = category.id WHERE name = '$1'",
    [categoryName]
  );
}

// async function insertUsername(username) {
//   await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
  fetchMovies,
  fetchCategories,
  fetchMovieByCategory,
};
