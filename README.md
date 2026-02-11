# Art Gallery Server

A modern **art gallery management API** built with cutting-edge technologies for optimal performance and developer experience.

## 🛠️ Technology Stack

- **Runtime**: [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Lightweight, fast web framework  
- **Database**: [PostgreSQL](https://postgresql.org/) with [Prisma ORM](https://prisma.io/)
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Logging**: [Pino](https://getpino.io/) - High-performance structured logging
- **Authentication**: [Better Auth](https://www.better-auth.com/) - Modern auth solution
- **Language**: TypeScript

## 🎨 Features

### **Art Management System**
- **CRUD Operations**: Create, read, update, and delete art pieces
- **Image Upload**: Support for art piece images with file validation
- **Data Validation**: Robust input validation using Zod schemas
- **Error Handling**: Comprehensive error handling with structured responses

### **API Endpoints**
- `GET /arts` - Retrieve all art pieces
- `GET /arts/:id` - Get specific art piece by ID
- `POST /arts` - Create new art piece (supports multipart/form-data for images)
- `PUT /arts/:id` - Update art piece information
- `DELETE /arts/:id` - Remove art piece
- `POST /arts/:id/image` - Upload/update art piece image

### **Core Features**
- **Health Monitoring**: Built-in health check endpoint
- **Static File Serving**: Efficient image serving from uploads directory
- **CORS Support**: Configured for cross-origin requests
- **Structured Logging**: Request/response logging with Pino
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🗄️ Database Schema

```prisma
model Art {
  id       Int     @id @default(autoincrement())
  artname  String
  artist   String  
  price    Int
  imageUrl String?
}
```

## 🚀 Getting Started

### **Prerequisites**
- [Bun](https://bun.sh/) installed
- PostgreSQL database running
- Environment variables configured

### **Installation**
```bash
# Install dependencies
bun install

# Set up database
bunx prisma generate
bunx prisma migrate dev

# Start development server
bun run dev
```

### **Available Scripts**
- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers and business logic
├── middleware/      # Custom middleware (error handling)
├── routes/         # API route definitions
├── schema/         # Zod validation schemas
├── utils/          # Utilities (logger, database, file handling)
└── server.ts       # Main application entry point
```

## 🔗 Related Projects

This is an updated version of the original project. View the previous implementation: [Original Server](https://github.com/aswin402/NEXT.JS_CRUD_with_HONO/tree/main/server)