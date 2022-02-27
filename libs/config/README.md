# Application config module

This library is containing interface for getting application environment variables.

## Environmental variables

| ENV Name                | Type            | Default        | Description                                                            |
| ----------------------- | --------------- | -------------- | ---------------------------------------------------------------------- |
| `APP_PORT`              | positive number | `3000`         | Port on which nest application is running.                             |
| `JWT_SECRET`            | string          | `I'm a secret` | Random string used for JWT signatures.                                 |
| `AUTH_TOKEN_EXPIRES_IN` | string          | `5min`         | Number of milliseconds or string time in which auth token is expiring. |
