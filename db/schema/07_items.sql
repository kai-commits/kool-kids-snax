-- Menu items

DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  url_thumb_photo VARCHAR(255) NOT NULL,
  menu_group_id INTEGER REFERENCES menu_groups(id) ON DELETE CASCADE
);
