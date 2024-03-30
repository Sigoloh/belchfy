CREATE TABLE IF NOT EXISTS search_cache (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT,
    results TEXT,
    expire_at DATETIME
);