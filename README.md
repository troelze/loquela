# Loquela Language Learning

## Setup
- Clone the repo onto your machine:
    ```
    git clone https://github.com/laurenmackey/loquela.git
    ```
- [Install node](https://nodejs.org/en/) if needed
- Install dependencies:
    ```
    npm install
    ```
- Set up your local database:
    - Install and start up postgres. This will vary by operating system. I followed the instructions under "Installation" [here](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
    ```
    - Create a default user:
    ```
    psql postgres
    CREATE ROLE me WITH LOGIN PASSWORD 'password';
    ALTER ROLE me CREATEDB;
    \q
    ```
    - Login as default user and create loquela db:
    ```
    psql -d postgres -U me
    CREATE DATABASE loquela;
    \q
    ```
    - Create and populate tables from migration files:
    ```
    db-migrate up
    ```
    - If you need to modify the tables, either change the migration file or create a new one (`db-migrate create my-title`).
    Then drop and re-create the tables:
    ```
    db-migrate down
    db-migrate up
    ```
    - It will probably help to download a database GUI of some sort. I downloaded Postico.

## Local Development
- Pull in changes from master:
    ```
    git checkout master
    git pull origin master
    ```
- Create a new branch:
    ```
    git checkout -b your-name/your-feature
    ```
- Start up the server:
    ```
    node app.js
    ```
- Visit http://localhost:8080/ to see the site
- Make changes as needed
- Add, commit, push your changes
    ```
    git add .
    git status
    git commit -m "Your commit message"
    git push origin your-name/your-feature
    ```
- Submit a pull request: 
    - Go to your branch on github and click "Compare and pull request"
    - Look over the files changed and add any necessary comments
    - Submit the request
- Either ask someone to review it or just approve the pull request from the master branch
