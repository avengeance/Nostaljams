# Sound Cloud Clone

## App Link

[Render](#)

## Database Schema Design

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/session
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Songs

### View all Songs

Returns all songs

- Request
  - Method: GET
  - url: /api/songs
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Tpye: application/json
  - Body:
    ```json
    {
        "Songs":[
            {
                "id":1,
                "userId":1,
                "name":"",
                "artists" : "",
                "description":"",
                "audio_url":"",
                "SongImage":{
                    "id":1,
                    "img_url":""
                },
                "SongCommentsCnt":5,
                "SongLikesCnt":10
            },
            {
                "id":2,
                "userId":1,
                "name":"",
                "artists" : "",
                "description":"",
                "audio_url":"",
                "SongImage":{
                    "id":2,
                    "img_url":""
                },
                "SongCommentsCnt":5,
                "SongLikesCnt":10
            }
        ]
    }
    ```

### View Song details by it's ID

Returns the details of a Song specified by its ID.

- Request
  - Method: GET
  - url: /api/songs/:id
  - Body: none
- Successful Response
  - Status Code: 200,
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "id":1,
        "userId":1,
        "name":"",
        "artists" : "",
        "description":"",
        "audio_url":"",
        "SongImages":{
            "id":1,
            "img_url":""
        },
        "SongLikesCnt":10,
        "SongComments":{[
            {
                "id":1,
                "userId": 3,
                "comment":"",
                "createdAt":,
                "updatedAt":
            },
            {
                "id":1,
                "userId": 3,
                "comment":"",
                "createdAt":,
                "updatedAt":
            }
        ]}
    }
    ```
- Error response: Couldn't find a Song with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message":"Song couldn't be found",
      "statusCode":404
    }
    ```


### View all Songs by User ID
Returns all Songs created by specifed User ID.
- Request
  - Method: GET
  - url: /api/users/:id/songs
  - Body: none
- Successful Response
  - Status Code: 200,
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {"UserSongs":[
        "id":1,
        "userId":1,
        "name":"",
        "artists" : "",
        "description":"",
        "audio_url":"",
        "SongImages":{
            "id":1,
            "img_url":""
        },
        "SongLikesCnt":10,
        "SongCommentsCnt":2
    ]}
    ```
- Error response: Couldn't find a Song with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message":"Song couldn't be found",
      "statusCode":404
    }
    ```

### Create new Song

url: /api/songs/create

### Update Song

url: /api/songs/:id

### Delete Song

url: /api/songs/:id/delete

---

## Comments

### View Comments by Song ID

url: /api/songs/:id/comments

### Create new Comment

url: /api/songs/:id/comments/new

### Update Comment

url: /api/songs/:id/comments/:id

### Delete Comment

url: /api/songs/:id/comments/:id/delete

---

## Playlists

### View all Playlists by User ID, that created Playlist

url: /api/users/:id/playlists

### View Playlist details by it's ID

url: /api/users/:id/playlists/:id

### Create new Playlist

url: /api/users/:id/playlists/new

### Update Playlist

url: /api/users/:id/playlists/:id

### Delete Playlist

url: /api/users/:id/playlists/:id/delete

---

## Likes

### View Likes by Song ID

url: /api/songs/:id/likes

### View Likes by Playlist ID

url: /api/playlists/:id/likes

### Create new Like

url: /api/songs/:id/likes/create

### Delete Like

url: /api/songs/:id/likes/delete
