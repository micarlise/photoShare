
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const queries = {
    createUser: 'INSERT INTO users (username, email) VALUES (?, ?)'
};

function createUser(username, email) {
    params = [username, email];

    return client.execute(queries.createUser, params, {prepare: true});
}

module.exports = { createUser }
