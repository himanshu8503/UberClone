# BACKEND DOCUMENTATION

# USER ENDPOINT

## User registration

### Description
This endpoint allows users to register with the Uber Clone application. It validates the user input, hashes the password, creates a new user record in the database, and returns an authentication token.

---

### Endpoint
```
 POST users/register
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


## Notes
- The password is automatically hashed before being stored in the database using bcrypt
- A JWT authentication token is generated and returned upon successful registration
- The user ID can be extracted from the token for future authenticated requests
- Duplicate email addresses will not be allowed due to unique constraint on the Email field


---

## User Login

### Description
This endpoint allows existing users to log in to the Uber Clone application. It validates the user's email and password, verifies the credentials against the database, and returns an authentication token upon successful login.

---

### Endpoint
```
 POST users/login
```


### Request Body
```json
{
  "email": "string (required, must be valid email format)",
  "password": "string (required, minimum 6 characters)"
}
```

### Required Fields
| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `email` | String | Valid email format | User's registered email address |
| `password` | String | Min 6 characters | User's password |

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## Response

### Success Response (Status Code: 200)
**Condition**: User credentials are valid and login is successful.

```json
{
  "user": {
    "_id": "ObjectId",
    "Fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "Email": "john.doe@example.com",
    "password": "HashedPassword"
    "SocketID": null
  },
  "token": "jwt_token_string"
}
```

### Error Response (Status Code: 401)
**Condition**: Invalid email or password.

```json
{
  "message": "Invalid Email or Password"
}
```

### Validation Error Response (Status Code: 400)
**Condition**: Validation fails due to invalid input format.

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
      "value": "12345",
      "msg": "Password should be at least 6 character long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | User successfully logged in |
| **400** | Bad Request - Validation error (invalid email format, short password, etc.) |
| **401** | Unauthorized - Invalid email or password |

---



## Notes
- The password is verified against the stored hashed password using bcrypt
- A JWT authentication token is generated and returned upon successful login
- The token should be used in subsequent authenticated requests
- The user object returned excludes the password field for security
- If the email is not found in the database, or the password doesn't match, a generic error message is returned for security reasons

---

## User Profile

### Description
This endpoint retrieves the authenticated user's profile information. It requires a valid JWT token or authentication cookie, and returns the user's profile data.

---

### Endpoint
```
 GET users/profile
```

### Authentication
**Required**: Yes - JWT token required

**Token Location**: 
- Cookie: `token`
- OR Header: `Authorization: Bearer <token>`

### Request Headers
```
Authorization: Bearer <jwt_token>
```
OR

```
Cookie: token=<jwt_token>
```

---

## Response

### Success Response (Status Code: 200)
**Condition**: Valid JWT token provided and user is authenticated.

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
  }
}
```

### Error Response (Status Code: 401)
**Condition**: Invalid or missing JWT token.

```json
{
  "message": "Unauthorized"
}
```

### Error Response (Status Code: 401)
**Condition**: JWT token verification fails.

```json
{
  "message": "Unauthorized",
  "ERROR": "jwt malformed"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | User profile successfully retrieved |
| **401** | Unauthorized - Invalid, missing, or expired token |

---

## Notes
- This endpoint requires authentication via JWT token
- The token can be provided either in cookies or Authorization header
- The Authorization header format must be `Bearer <token>`
- The returned user object excludes the password field for security
- The user data is retrieved from the token's decoded ID and fetched from the database


