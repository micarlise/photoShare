
CREATE KEYSPACE photoshare WITH replication = {'class': 'SimpleStrategy',
'replication_factor': 1};

CREATE TABLE IF NOT EXISTS photoshare.user_photos (username text PRIMARY KEY, id text, creation_date date);

CREATE TABLE IF NOT EXISTS photoshare.users (username text PRIMARY KEY, email text, last_modified timestamp);

CREATE TABLE IF NOT EXISTS photoshare.photos (id text PRIMARY KEY, contentkey text, title text); 

CREATE TABLE IF NOT EXISTS photoshare.followers (username text PRIMARY KEY, followers set<text>);
