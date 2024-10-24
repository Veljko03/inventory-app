#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);
CREATE TABLE IF NOT EXISTS movie (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movieName VARCHAR(100),
    rating TEXT,
    duration INTTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name) 
VALUES
  ('Action'),
  ('Comedy'),
  ('Drama'),
  ('Horror');


INSERT INTO movie (movieName, rating, duration, category_id) 
VALUES
  ('Mad Max: Fury Road', 'R', 120, 1),
  ('Die Hard', 'R', 132, 1),
  ('Superbad', 'R', 113, 2),
  ('The Hangover', 'R', 100, 2),
  ('The Shawshank Redemption', 'R', 142, 3),
  ('Forrest Gump', 'PG-13', 144, 3),
  ('A Nightmare on Elm Street', 'R', 91, 4),
  ('The Conjuring', 'R', 112, 4);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
