# 🌐 API – Infinite Voices

Documentation of the main REST API endpoints.

---

## Authentication

### POST `/users/register`

- **Description:** Creates a new user.
- **Body:** `{ username, email, password }`
- **Response:** `{ token, user }`

### POST `/users/login`

- **Description:** Authenticates a user.
- **Body:** `{ email, password }`
- **Response:** `{ token, user }`

### POST `/users/logout`

- **Description:** Logs out and invalidates the token.
- **Body:** `{ token }`
- **Response:** `{ message }`

---

## Posts

### GET `/posts?currentPage=0`

- **Description:** Lists paginated posts.
- **Response:** `{ posts: [...] }`

### POST `/posts`

- **Description:** Creates a new post.
- **Body:** `{ title, message, user, tags }`
- **Response:** `{ post }`

---

## Comments

### GET `/comments?postId=...`

- **Description:** Lists comments for a post.
- **Response:** `{ comments: [...] }`

### POST `/comments`

- **Description:** Creates a comment.
- **Body:** `{ comment, postId, author }`
- **Response:** `{ populatedComment }`

---

## Notes

- All routes (except register/login) require JWT authentication.
- Use the header: `Authorization: Bearer <token>`

---
