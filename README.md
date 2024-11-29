# Gympass Solid API

It is an API project to manage gyms, users and check-ins. This project uses NodeJS. A user can check-in in nearby gyms when he is logged in. This project use Prisma, JWT and Fastify, also vitest to create test. It was developed using solid principles and test coverage.

## How to run
NPM
```
npm install

npm run start:dev
```
Docker:
```
docker-compose up
```

## Actions
- User
  - Register
  - Login
  - Get User check-in metrics
  - Get User check-in history
  - Get User profile
- Gym
  - Create
  - List nearby gyms using latitude and longitude (10 km)
  - Search gyms by name
- Check-in
  - Create check-in
  - Validate check-in

## Business rules
- A user should not be able to register with an email that is already in use
- A user should not be able to check-in twice in the same day
- A user should not be able to check-in in a gym that is more than 10 km away
- Check-in can be validate only 20 minutes after created
- Check-in can only be validated by Admins

## Non functional requirements
- All the lists should use pagination with 20 items per page
- The user should be authenticated using JWT