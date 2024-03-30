CREATE TABLE IF NOT EXISTS playlists (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    belchfy_url varchar(200),
    owner varchar(200),
    playlist_id varchar(40) UNIQUE,
    title varchar(500),
    videos TEXT,
    created_at DATETIME,
    last_updated DATETIME
);
