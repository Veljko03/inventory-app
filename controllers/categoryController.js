const db = require("../db/queries");

async function getAllCategories() {
  const categories = await db.fetchCategories();
}

module.exports = {
  getAllCategories,
};
