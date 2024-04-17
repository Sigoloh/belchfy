CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    username varchar(50) UNIQUE,
    password text,
    admin bit,
    created_at DATETIME,
    last_updated DATETIME,
  	deleted bit,
  	deleted_at DATETIME
);