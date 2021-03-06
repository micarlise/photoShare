
const cassandra = require('cassandra-driver');
const elasticsearch = require('@elastic/elasticsearch');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const ESclient = new elasticsearch.Client({
    node: 'http://localhost:9200'
});

const user_photos_queries = {
    insert: 'INSERT INTO user_photos (username, id) VALUES (?, ?)',
};

const photos_queries = {
    insert: 'INSERT INTO photos (id, contentkey, title) VALUES (?, ?, ?)',
    get: 'SELECT contentkey FROM photos WHERE id = ?',
};

function uploadPhoto(user, photoId, contentkey, title) {

    const queries = [
        { query: user_photos_queries.insert, params: [user, photoId] },
        { query: photos_queries.insert, params: [photoId, contentkey, title] }
    ];

    const indexObj = {
        index: 'photos',
        body: {
            id: photoId,
            title: title
        }
    };

    return client.batch(queries, {prepare: true})
    .then(() => {
        ESclient.index(indexObj);
    });
}

function getPhoto(photoId) {

    return client.execute(photos_queries.get, [photoId], {prepare: true})
    .then((response) => {
        if (response.rows.length == 0) {
            return
        }

        return response.rows[0].contentkey;
    });
}

module.exports = { uploadPhoto, getPhoto }
