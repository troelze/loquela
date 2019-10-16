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
- Set up your local database. This will vary by operating system. For OsX:
    - Install Homebrew if needed:
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
    - Install PostgreSQL if needed, and start it up with your computer:
    ```
    brew install postgresql
    pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
    postgres -V // Make sure it's running
    ```

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
