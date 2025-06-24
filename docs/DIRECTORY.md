# 📂 Directory Structure – Infinite Voices

Overview of the main project directories and files.

```
Infinite-Voices/
│
├── src/
│   ├── server/
│   │   ├── DB/                # Database models and connection
│   │   ├── controllers/       # Endpoint logic
│   │   ├── middlewares/       # Express middlewares
│   │   ├── modules/           # Express server configuration
│   │   ├── routes/            # API routes
│   │   └── index.ts           # Backend entry point
│   ├── interfaces/            # Interfaces and contracts
│   ├── application/           # Use cases and application logic
│   └── infrastructure/        # Specific implementations (e.g., models)
│
├── docs/                      # Project documentation
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

- **docs/**: Documentation and guides.
- **src/server/**: Backend source code.
- **src/interfaces/**: TypeScript contracts and interfaces.
- **src/application/**: Business logic and use cases.
- **src/infrastructure/**: Concrete implementations (e.g., Mongoose models).

---
