const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS  Genres (
         genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
         ganreName VARCHAR ( 255 )
    );

    CREATE TABLE IF NOT EXISTS Movies (
        movie_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255) NOT NULL,
        director VARCHAR(255),
        release_year INTEGER,
        rating INTEGER,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS MovieGenres (
        genre_id INTEGER NOT NULL REFERENCES Genres(genre_id),
        movie_id INTEGER NOT NULL REFERENCES Movies(movie_id),
        PRIMARY KEY (genre_id, movie_id) 
    );

    

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    // connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
