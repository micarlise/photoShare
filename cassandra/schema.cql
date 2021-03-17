
CREATE KEYSPACE photoshare WITH replication = {'class': 'SimpleStrategy',
'replication_factor': 1};

CREATE TABLE IF NOT EXISTS photoshare.photos (id text PRIMARY KEY, contentkey text, creation_date date);
