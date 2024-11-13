# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/nikolakozaryan/nodejs2024Q3-service
```

## Move to app folder

```
cd nodejs2024Q4-service
```

## Change brunch to dev

```
git checkout dev
```

## Installing NPM modules

```
npm install
```

Note: If you have problems with this command, just run it with flag --legacy-peer-deps

## Create .env file

```
.env.example -> .env
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application with Docker

Download Docker Desktop [HERE](https://www.docker.com/) and install it.

Change brunch to dev-docker

```
git checkout dev-docker
```

To run the app with docker:

```
npm run compose
```

or in detached mode:

```
npm run compose-detached
```

To scan images for security vulnerabilities:

```
npm run scan
```

Images on [DockerHub](https://hub.docker.com/):

1. [Service](https://hub.docker.com/repository/docker/nikolakozaryan/nodejs2024q3-service-api/general)
2. [Database](https://hub.docker.com/repository/docker/nikolakozaryan/nodejs2024q3-service-postgres/general)

**_Nice to know_: in case you use Windows, please activate Hyper-V feature in Windows settings and disable "Use the WSL 2 based engine" option in Docker Desktop settings.**

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## API

API description is available [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md#assignment-rest-service).
