
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const queries = {
    uploadPhoto: 'INSERT INTO photos (id, contentkey) VALUES (?, ?) IF NOT EXISTS',
    getPhoto: 'SELECT contentkey FROM photos WHERE id = ?',
    deletePhoto: 'DELETE FROM photos where id = ?'
};

function uploadPhoto(id, contentkey) {
    params = [id, contentkey];

    return client.execute(queries.uploadPhoto, params, {prepare: true});
}

function getPhoto(id) {
    return client.execute(queries.getPhoto, [id], {prepare: true})
    .then((response) => {
        if (response.rows.length == 0) {
            return
        }

        return response.rows[0].contentkey;
    });
}

function deletePhoto(id) {
    return client.execute(queries.deletePhoto, [id], {prepare: true});
}

module.exports = { uploadPhoto, getPhoto, deletePhoto }
