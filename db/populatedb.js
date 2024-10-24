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
    rating DOUBLE PRECISION,
    duration INTEGER,
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
  ('Mad Max: Fury Road', '9.0', 120, 1),
  ('Die Hard', '8', 132, 1),
  ('Superbad', '7.6', 113, 2),
  ('The Hangover', '4.5', 100, 2),
  ('The Shawshank Redemption', '9.2', 142, 3),
  ('Forrest Gump', '8.4', 144, 3),
  ('A Nightmare on Elm Street', '8', 91, 4),
  ('The Conjuring', '7.5', 112, 4);

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
