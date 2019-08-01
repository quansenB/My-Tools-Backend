# API documentation

# Authentication

## [POST] registration

**URL:** `/api/auth/register`

**Payload:** an object with the following properties.

```js
{
  "username": "TimonTest",
  "password": "1234567"
}
```

**Returns:** an object with user data and authentication token.


## [POST] login

**URL:** `/api/auth/login`

**Payload:** an object with the following properties.

```js
{
  "username": "TimonTest",
  "password": "1234567"
}
```

**Returns:** an object with user data and authentication token.
  

# Users

## [GET] Users

**URL:** `/api/users`

**Returns:** an array with user data.


## [GET] User by ID

**URL:** `/api/users/:id`

**Params:** Valid user ID.

**Returns:** an object with user data.


## [GET] User by Name

**URL:** `/api/users/name/:name`

**Params:** Valid username.

**Returns:** an object with user data.


## [PUT] User

**URL:** `/api/users/:id`

**Params:** Valid user ID.

**Payload:** an object containing the User property/properties you want to update.

```js
{
  "username": "JolieJumbo",
  "password": "abcdefgh"
}
```

**Returns:** an object with user data.


## [DELETE] User

**URL:** `/api/users/:id`

**Params:** Valid user ID.

```js
{
  "username": "JolieJumbo",
  "password": "abcdefgh"
}
```

**Returns:** Message indicating the user has been deleted


## [GET] Borrowings of user

**URL:** `/api/users/borrowings`

**Params:** Uses JWT token to extract ID.

**Returns:** an array with borrowings data.


## [GET] Borrowed items of user

**URL:** `/api/users/borrowed`

**Params:** Uses JWT token to extract ID.

**Returns:** an array with borrowed items data.


## [GET] Owner of tool

**URL:** `/api/users/tool/:id/owner`

**Params:** Valid tool ID.

**Returns:** an array with borrowed items data.


## [GET] Borrower of tool

**URL:** `/api/users/tool/:id/borrower`

**Params:** Valid tool ID

**Returns:** an array with borrowed items data.


