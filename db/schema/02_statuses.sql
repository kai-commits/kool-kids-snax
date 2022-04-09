-- Statuses of order

DROP TABLE IF EXISTS statuses CASCADE;

CREATE TABLE statuses (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);
