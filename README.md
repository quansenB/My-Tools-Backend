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


# Tools

## [GET] Tools

**URL:** `/api/tools`

**Returns:** an array with tool data.


## [GET] Tool by ID

**URL:** `/api/tools/:id`

**Params:** Valid tool ID.

**Returns:** an object with tool data.


## [PUT] Tool

**URL:** `/api/tools/:id`

**Params:** Valid tool ID.

**Payload:** an object containing the tool property/properties you want to update.

```js
{
  "name": "Hammer",
  "description": "Used with nails",
  "owner_id": "1",
  "borrower_id": "2"
}
```

**Returns:** an object with user data.


## [DELETE] User

**URL:** `/api/tools/:id`

**Params:** Valid tool ID.

**Returns:** Message indicating the tool has been deleted


# Borrow History

## [GET] owner

**URL:** `/api/borrow/owner`

**Returns:** complete lending and request history of the user making the request. Needs to identifiy with JSON Web Token.


## [GET] borrower

**URL:** `/api/borrow/borrower`

**Returns:** complete borrowing and request history of the user making the request. Needs to identifiy with JSON Web Token.


## [POST] request

**URL:** `/api/borrow/request`

**Payload:** an object with the following properties.

```js
{
  "tool_id" : "23"
}
```

**Returns:** an object with transaction data, indicating the tool has been requested by the user sending the API request.


## [POST] accept

**URL:** `/api/borrow/accept`

**Payload:** an object with the following properties.

```js
{
  "transaction_id" : "7"
}
```

**Returns:** an object with transaction data, indicating the tool has now been lent out to the user.


## [POST] takeBack

**URL:** `/api/borrow/takeback`

**Payload:** an object with the following properties.

```js
{
  "transaction_id" : "7"
}
```

**Returns:** an object with transaction data, indicating the tool has now been taken back from the borrower and is ready to be borrowed again.

