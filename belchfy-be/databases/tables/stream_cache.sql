-- stream cache
CREATE TABLE IF NOT EXISTS stream_cache(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  belchfy_url varchar(200),
	video_id varchar(40) UNIQUE,
 	results TEXT,
  expires_at DATETIME
)