![image](https://github.com/TalCrypto/nestjs-auth/assets/83287152/625b92d5-30f6-4e07-833a-85f5c5b40b15)
## Description

This project is an authentication nestjs project utilizing TypeORM(PostgreSQL) and Passport.js(JWT).

## Prerequisite

Insall Node >= 18.0.0 and [Docker](https://docs.docker.com/engine/install/ubuntu/)

## Running the app

```bash
# watch mode
$ npm run docker:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run docker:e2e
```

## Summary

This project uses a docker container to run nestjs and built-in postgresql image.
After running the watch mode, visit [here](http://localhost:3000/help).
Especially, e2e tests are doing within the docker container, which is an efficient way in case of applying CI workflow.
