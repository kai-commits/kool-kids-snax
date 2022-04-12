-- Types of food

DROP TABLE IF EXISTS menu_groups CASCADE;

CREATE TABLE menu_groups (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);
