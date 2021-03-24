# photoShare ![unit tests](https://github.com/micarlise/photoShare/actions/workflows/nodejs.yml/badge.svg)

## Running the server

**starting the servers**

```bash
docker-compose up -d
```

**stopping the servers**

```bash
docker-compose down
```

## Using the API

### Users Endpoints

**Create a user**

```bash
curl -X POST -H 'Content-Type: application/json' -d '{"username": "testuser", "email": "test@user.com"}' localhost:3000/users
```

**Get a user's info**

```bash
curl localhost:3000/users/testuser
```

### Photos/videos

**Upload a photo**

```bash
curl --form photo='@filename' localhost:3000/photos/testuser
```

### follow/unfollow 

**add a follower to a user**

```bash
curl localhost:3000/followers/testuser/follows/otheruser
```

**unfollow a user**

```bash
curl localhost:3000/followers/testuser/unfollows/otheruser
```

**list all followers of a user**

```bash
curl localhost:3000/followers/testuser
```
