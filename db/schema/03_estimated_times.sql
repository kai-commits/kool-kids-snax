-- estimated wait times for customer

DROP TABLE IF EXISTS estimated_times CASCADE;

CREATE TABLE estimated_times (
  id SERIAL PRIMARY KEY NOT NULL,
  time VARCHAR(50) NOT NULL
);
