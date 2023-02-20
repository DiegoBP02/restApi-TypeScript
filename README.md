Project made through the RestAPI with TypeScript and testing with Jest videos from the 'TomDoesTech' channel. My main purpose with this project is to learn typescript and jest.

## Concepts:
- REST API principals
- CRUD
- HTTP methods
- JWT & refresh tokens
- Request validation

## Technologies
- Node.js
- MongoDB with Mongoose
- TypeScript
- Express.js & Express.js middleware
- Zod validation

## Structure step-by-step:
#### Bootstrap application
- Setup express JS
- Create routes function
- Setup database connection
- Setup logger
- Validate request middleware
#### Registration
- Create user model
- Create user endpoint
- Create user session
- Deserialize user middleware (refresh tokens)
- Get sessions
- Delete session
- Require user middleware
#### Product resource
- Create product model
- Create product
- Read product
- Update product
- Delete product

## Testing with Jest
#### What i learned:
- Test a REST API end-to-end with Supertest and mongo-db-memory-server
- mocking services
- testing from controller to the service

# Installation
- install dependencies with `yarn install`
- create .env and provide:
  - MONGO_URI=<YOUR_MONGODB_URL> 
  - JWT_SECRET=<YOUR_JWTSECRET> OR use the public key in config(only for testing)
- run the project with `yarn dev`
- test with `yarn test --watchAll`
