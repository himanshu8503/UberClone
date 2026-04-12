# BACKEND DOCUMENTATION

# USER ENDPOINT

## POST

### Description
This endpoint allows users to register with the Uber Clone application. It validates the user input, hashes the password, creates a new user record in the database, and returns an authentication token.

---

### Endpoint
```
users/register
```


### Request Body
```json
{
  "fullname": {
    "firstname": "string (required, minimum 3 characters)",
    "lastname": "string (optional, minimum 3 characters if provided)"
  },
  "email": "string (required, must be valid email format, minimum 5 characters)",
  "password": "string (required, minimum 6 characters)"
}
```

### Required Fields
| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `fullname.firstname` | String | Min 3 characters | User's first name |
| `fullname.lastname` | String | Min 3 characters (optional) | User's last name |
| `email` | String | Valid email format, Min 5 characters, Unique | User's email address |
| `password` | String | Min 6 characters | User's password (will be hashed with bcrypt) |

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## Response

### Success Response (Status Code: 201)
**Condition**: User successfully registered and token generated.

```json
{
  "user": {
    "_id": "ObjectId",
    "Fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "Email": "john.doe@example.com",
    "SocketID": null
  },
  "token": "jwt_token_string"
}
```

### Error Response (Status Code: 400)
**Condition**: Validation fails due to invalid input.

```json
{
  "ERRORS": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "Firstname should be at least 3 character long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **201** | User successfully created and registered |
| **400** | Bad Request - Validation error (invalid email, short firstname/password, etc.) |

---

## Validation Rules

### Email
- Must be a valid email format
- Must be at least 5 characters long
- Must be unique in the database

### Firstname
- Must be at least 3 characters long
- Required field

### Lastname
- Must be at least 3 characters long (if provided)
- Optional field

### Password
- Must be at least 6 characters long
- Required field
- Will be hashed using bcrypt with salt rounds of 10 before storing in the database

---

## Notes
- The password is automatically hashed before being stored in the database using bcrypt
- A JWT authentication token is generated and returned upon successful registration
- The user ID can be extracted from the token for future authenticated requests
- Duplicate email addresses will not be allowed due to unique constraint on the Email field
