
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const queries = {
    uploadPhoto: 'INSERT INTO photos (username, id, contentkey) VALUES (?, ?, ?) IF NOT EXISTS',
    getPhoto: 'SELECT contentkey FROM photos WHERE user = ? AND id = ?', 
    deletePhoto: 'DELETE FROM photos where user = ? AND id = ?'
};

function uploadPhoto(user, id, contentkey) {
    params = [user, id, contentkey];

    return client.execute(queries.uploadPhoto, params, {prepare: true});
}

function getPhoto(user, id) {
    params = [user, id]

    return client.execute(queries.getPhoto, params, {prepare: true})
    .then((response) => {
        if (response.rows.length == 0) {
            return
        }

        return response.rows[0].contentkey;
    });
}

function deletePhoto(user, id) {
    params = [user, id]

    return client.execute(queries.deletePhoto, params, {prepare: true});
}

module.exports = { uploadPhoto, getPhoto, deletePhoto }
