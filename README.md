# Nest.js crypto API - Demo

This project was generated using [Nx](https://nx.dev).

## First run instruction

Install required dependencies

`npm ci`

Create a `.env` file and then complete with the required values.

`cp .env.template .env`

Start development server

`npm run start`

Open your browser and navigate to Swagger documentation.

## Development server

Run `npm run start` for a dev server. Navigate to http://localhost:3000/api. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests.

Run `npm run test:affected` to execute the unit tests affected by a change.

## Mocked user

| Email               | Password        |
| ------------------- | --------------- |
| `admin@example.com` | `administrator` |
| `mod@example.com`   | `moderator`     |

## Application config

All you want to know about environment variables are [here](./libs/config/README.md).
