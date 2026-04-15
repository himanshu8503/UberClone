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

---

## User Logout

### Description
This endpoint allows authenticated users to log out from the Uber Clone application. It invalidates the JWT token by adding it to a blacklist, clears the authentication cookie, and returns a success message.

---

### Endpoint
```
 GET users/logout
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
**Condition**: User successfully logged out and token blacklisted.

```json
{
  "message": "Logged out successfully"
}
```


### Error Response (Status Code: 401)
**Condition**: JWT token verification fails or token is blacklisted.

```json
{
  "message": "Unauthorized",
  "ERROR": "jwt expired" // IF TryCatch FAILD!
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | User successfully logged out and token invalidated |
| **401** | Unauthorized - Invalid, missing, or expired token |

---

## Notes
- This endpoint requires authentication via JWT token
- The token can be provided either in cookies or Authorization header
- The provided token is added to the blacklist collection in the database
- Blacklisted tokens are automatically removed from the database after 24 hours (TTL index)
- The authentication cookie is cleared from the client
- After logout, the token cannot be used for future authenticated requests
- Any subsequent requests with a blacklisted token will be rejected

---

# CAPTAIN ENDPOINT

## Captain Registration

### Description
This endpoint allows captains to register with the Uber Clone application. It validates the captain input, hashes the password, creates a new captain record in the database with their vehicle information, and returns an authentication token.

---

### Endpoint
```
 POST captains/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string (required, minimum 3 characters)",
    "lastname": "string (required, minimum 3 characters)"
  },
  "email": "string (required, must be valid email format, unique)",
  "password": "string (required, minimum 6 characters)",
  "vehicle": {
    "color": "string (required, minimum 3 characters)",
    "plate": "string (required, minimum 3 characters)",
    "capacity": "number (required, minimum 1)",
    "vehicletype": "string (required, enum: 'car', 'motorcycle', 'auto')"
  }
}
```

### Required Fields
| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `fullname.firstname` | String | Min 3 characters | Captain's first name |
| `fullname.lastname` | String | Min 3 characters | Captain's last name |
| `email` | String | Valid email format, Unique | Captain's email address |
| `password` | String | Min 6 characters | Captain's password (will be hashed with bcrypt) |
| `vehicle.color` | String | Min 3 characters | Vehicle color |
| `vehicle.plate` | String | Min 3 characters | Vehicle plate number |
| `vehicle.capacity` | Number | Min 1 | Vehicle seating capacity |
| `vehicle.vehicletype` | String | One of: 'car', 'motorcycle', 'auto' | Type of vehicle |

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Smith"
  },
  "email": "john.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "white",
    "plate": "XYZ-789",
    "capacity": 4,
    "vehicletype": "car"
  }
}
```

---

## Response

### Success Response (Status Code: 201)
**Condition**: Captain successfully registered and token generated.

```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "ObjectId",
    "Fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "Email": "john.smith@example.com",
    "Password":"daskbdjkabkjsdbjbjsdb"
    "Vehicle": {
      "color": "white",
      "plate": "XYZ-789",
      "capacity": 4,
      "vehicletype": "car"
    },
    "Status": "inactive",
    "SocketID": null,
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

### Error Response (Status Code: 400)
**Condition**: Captain with this email already exists.

```json
{
  "message": "Captain with this email already exist"
}
```

### Error Response (Status Code: 400)
**Condition**: Validation fails due to invalid input.

```json
{
  "errors": [
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
      "msg": "Firstname must be at least 3 character long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "12345",
      "msg": "Firstname must be at least 6 character long",
      "path": "password",
      "location": "body"
    },
    {
      "type": "field",
      "value": "re",
      "msg": "Color must be at least 3 character long",
      "path": "vehicle.color",
      "location": "body"
    },
    {
      "type": "field",
      "value": "AB",
      "msg": "PlateNo. must be at least 3 character long",
      "path": "vehicle.plate",
      "location": "body"
    },
    {
      "type": "field",
      "value": "0",
      "msg": "Capacity must be at least 1",
      "path": "vehicle.capacity",
      "location": "body"
    },
    {
      "type": "field",
      "value": "car",
      "msg": "Invalid Vehicle Type",
      "path": "vehicle.vehicletype",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **201** | Captain successfully created and registered |
| **400** | Bad Request - Captain already exists or validation error |

---

## Notes
- The password is automatically hashed before being stored in the database using bcrypt
- A JWT authentication token is generated and returned upon successful registration (expires in 24 hours)
- The captain's initial status is set to 'inactive'
- Duplicate email addresses will not be allowed due to unique constraint on the Email field
- Vehicle type must be one of: 'car', 'motorcycle', or 'auto'
- The location (latitude and longitude) is initially null and can be updated as the captain comes online
- The captain's socket ID is used for real-time communication and will be populated when the captain connects

---

## Captain Login

### Description
This endpoint allows registered captains to log in to the Uber Clone application. It validates the captain's email and password, verifies the credentials against the database, and returns an authentication token upon successful login.

---

### Endpoint
```
 POST captains/login
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
| `email` | String | Valid email format | Captain's registered email address |
| `password` | String | Min 6 characters | Captain's password |

### Example Request
```json
{
  "email": "john.smith@example.com",
  "password": "password123"
}
```

---

## Response

### Success Response (Status Code: 200)
**Condition**: Captain credentials are valid and login is successful.

```json
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "ObjectId",
    "Fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "Email": "john.smith@example.com",
    "Password":"daskbdjkabkjsdbjbjsdb"
    "Vehicle": {
      "color": "white",
      "plate": "XYZ-789",
      "capacity": 4,
      "vehicletype": "car"
    },
    "Status": "inactive",
    "SocketID": null,
    "location": {
      "lat": null,
      "lng": null
    }
  }
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
  "errors": [
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
      "msg": "Password must be at least 6 character long",
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
| **200** | Captain successfully logged in |
| **400** | Bad Request - Validation error (invalid email format, short password, etc.) |
| **401** | Unauthorized - Invalid email or password |

---

## Notes
- The password is verified against the stored hashed password using bcrypt
- A JWT authentication token is generated and returned upon successful login (expires in 24 hours)
- The token is set as a cookie and should be used in subsequent authenticated requests
- The captain object returned excludes the password field for security
- If the email is not found in the database, or the password doesn't match, a generic error message is returned for security reasons

---

## Captain Profile

### Description
This endpoint retrieves the authenticated captain's profile information. It requires a valid JWT token or authentication cookie, and returns the captain's profile data including vehicle information.

---

### Endpoint
```
 GET captains/profile
```

### Authentication
**Required**: Yes - JWT token required

**Token Location**: 
- Cookie: `token`
- OR Header: `Authorization: Bearer <token>`


---

## Response

### Success Response (Status Code: 200)
**Condition**: Valid JWT token provided and captain is authenticated.

```json
{
  "captain": {
    "_id": "ObjectId",
    "Fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "Email": "john.smith@example.com",
    "Vehicle": {
      "color": "white",
      "plate": "XYZ-789",
      "capacity": 4,
      "vehicletype": "car"
    },
    "Status": "inactive",
    "SocketID": null,
    "location": {
      "lat": null,
      "lng": null
    }
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
  "ERROR": "Some Unknown Error the Catch Get"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | Captain profile successfully retrieved |
| **401** | Unauthorized - Invalid, missing, or expired token |

---

## Notes
- This endpoint requires authentication via JWT token
- The token can be provided either in cookies or Authorization header
- The Authorization header format must be `Bearer <token>`
- The returned captain object includes all profile information and vehicle details
- The captain data is retrieved from the token's decoded ID and fetched from the database

---

## Captain Logout

### Description
This endpoint allows authenticated captains to log out from the Uber Clone application. It invalidates the JWT token by adding it to a blacklist, clears the authentication cookie, and returns a success message.

---

### Endpoint
```
 GET captains/logout
```

### Authentication
**Required**: Yes - JWT token required

**Token Location**: 
- Cookie: `token`
- OR Header: `Authorization: Bearer <token>`

---

## Response

### Success Response (Status Code: 200)
**Condition**: Captain successfully logged out and token blacklisted.

```json
{
  "message": "logout successfully"
}
```

### Error Response (Status Code: 401)
**Condition**: JWT token verification fails or token is blacklisted.

```json
{
  "message": "Unauthorized",
  "ERROR": "Some Unknown Error the Catch Get"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| **200** | Captain successfully logged out and token invalidated |
| **401** | Unauthorized - Invalid, missing, or expired token |

---

## Notes
- This endpoint requires authentication via JWT token
- The token can be provided either in cookies or Authorization header
- The provided token is added to the blacklist collection in the database
- Blacklisted tokens are automatically removed from the database after 24 hours (TTL index)
- The authentication cookie is cleared from the client
- After logout, the token cannot be used for future authenticated requests
- Any subsequent requests with a blacklisted token will be rejected


