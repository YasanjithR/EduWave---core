# EduWave---core

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/).
- You have installed [MongoDB](https://www.mongodb.com/try/download/community). For Mac users, you can use [Homebrew](https://brew.sh/) (`brew install mongodb-community@7.0`).

## Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Create a `.env` file in the project root with the following variables:

`JWT_SECRET`
`EMAIL_ADDRESS`
`EMAIL_PASSWORD`

## Running the Application

### Mac

- Start MongoDB: `brew services start mongodb-community@7.0`.
- Build and start the Docker services: 
```bashc 
docker-compose build --no-cache 
```
- then run the application by
```bashc 
docker-compose up.
```

### Windows

- Start MongoDB: Navigate to your MongoDB installation folder and execute mongod.exe.
- Build and start the Docker services: 
```bashc 
docker-compose build --no-cache 
```
- then run the application by 
```bashc 
docker-compose up.
```
- Visit `http://localhost:3000`in your browser to access the application.

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where the Docker services are running.

For Mac, you can also stop the MongoDB service with `brew services stop mongodb-community@7.0`.

## Contributing to EduWave

To contribute to EduWave, follow these steps:

- Fork this repository.
- Create a branch: `git checkout -b <branch_name>`.
- Make your changes and commit them: `git commit -m '<commit_message>'`.
- Push to the original branch: `git push origin <project_name>/<location>`.
- Create the pull request.