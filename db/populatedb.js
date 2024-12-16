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

    INSERT INTO Genres (ganreName)
    VALUES
    ('Action'),
    ('Comedy'),
    ('Drama'),
    ('Sci-Fi'),
    ('Romance');

    INSERT INTO Movies (title, director, release_year, rating, description)
    VALUES
    ('Inception', 'Christopher Nolan', 2010, 9, 'A mind-bending thriller about dreams within dreams.'),
    ('Titanic', 'James Cameron', 1997, 8, 'A romantic tragedy aboard the ill-fated RMS Titanic.'),
    ('The Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 9, 'A hacker discovers the truth about his reality.'),
    ('The Notebook', 'Nick Cassavetes', 2004, 8, 'A love story spanning decades.'),
    ('Avengers: Endgame', 'Anthony Russo, Joe Russo', 2019, 9, 'The ultimate superhero showdown.');

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
