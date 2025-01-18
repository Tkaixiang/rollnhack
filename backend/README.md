# Game Leaderboard API Documentation

## Base URL

`http://localhost:8989`

## Endpoints

### Get All Leaderboard Entries

```
GET /leaderboard
```

Returns all players and their scores in the leaderboard.

**Response**

```json
{
  "success": true,
  "leaderboard": [
    {
      "name": "player1",
      "score": 100
    },
    {
      "name": "player2",
      "score": 200
    }
  ]
}
```

### Get Player Score

```
GET /leaderboard/:name
```

Returns the score for a specific player.

**Parameters**

- `name` (path parameter): The name of the player

**Response**

```json
{
  "success": true,
  "player": {
    "name": "player1",
    "score": 100
  }
}
```

**Error Response** (404)

```json
{
  "success": false,
  "error": "Player not found"
}
```

### Add New Score

```
POST /leaderboard
```

Adds a new player score to the leaderboard.

**Request Body**

```json
{
  "name": "player1",
  "score": 100
}
```

**Response**

```json
{
  "success": true,
  "leaderboard": [
    {
      "name": "player1",
      "score": 100
    }
  ]
}
```

**Error Responses**

400 - Missing Fields:

```json
{
  "success": false,
  "error": "Name and score are required"
}
```

400 - Duplicate Player:

```json
{
  "success": false,
  "error": "Player name already exists :c"
}
```

500 - Server Error:

```json
{
  "success": false,
  "error": "Failed to insert"
}
```
