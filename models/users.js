
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const queries = {
    createUser: 'INSERT INTO users (username, email) VALUES (?, ?)',
    getUser: 'SELECT * FROM users WHERE username = ?'
};

function createUser(username, email) {
    params = [username, email];

    return client.execute(queries.createUser, params, {prepare: true});
}

function getUser(username) {
    
    if (!username) {
        return
    }

    return client.execute(queries.getUser, [username], {prepare: true})
    .then(res => {

        if (res.rows.length == 0) {
            return 
        }

        return res.rows[0];
    });
}

module.exports = { createUser, getUser }
