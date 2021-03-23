
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['0.0.0.0'],
    localDataCenter: 'datacenter1',
    keyspace: 'photoshare'
});

const queries = {
    follow: 'UPDATE followers SET followers = followers + ? WHERE username = ?',
    unfollow: 'UPDATE followers SET followers = followers - ? WHERE username = ?',
    getFollowers: 'SELECT followers from followers WHERE username = ?'
};

function getFollowers(user) {

    return client.execute(queries.getFollowers, [user], {prepare: true})
    .then(res => {

        if (res.rows.length == 0) {
            return
        }

        return res.rows;
    });
}

function follow(user, follower) {
    params = [Array(follower), user];

    return client.execute(queries.follow, params, {prepare: true});
}

function unfollow(user, follower) {
    params = [Array(follower), user];

    return client.execute(queries.unfollow, params, {prepare: true})
}

module.exports = { getFollowers, follow, unfollow }
