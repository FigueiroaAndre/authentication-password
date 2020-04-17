# authentication-password
A nodejs application that handles a simple login-password authentication.

## Project Goals
- Learn how to use DB in a nodejs application, using the **sequelize** library
- Build an application that can make CRUD operations in data stored in a database

## Future Work
- Apply this authentication logic in my future projects (short-term goal)
- Be able to implement more useful authentication methods, such as **Session ID**, **JWT**, **OAuth** (medium-term goal)

## Getting Started

**1. Create a database in your mysql server**

In your terminal, login in your mysql server

`$ mysql -u <yourlogin> -p`

After inserting your password, you should be in mysql command line interface. Create a database called auth_example

P.S: You can choose another name to give to the database, but remember to update it in **src/database/config.js**

`mysql> create database auth_example;`

**2. Update the information of the file /src/database/config.js**

It should look like something like this:
```
module.exports = {
    database: "auth_example",
    username: "<yourlogin>",
    password: "<yourpassword>",
    host: "localhost",
    dialect: "mysql"
};
```

**3. Test the connection with the DB, then create the tables**

To test the connection with your db: (not implemented yet)

`$ npm run test-db-connection`

To create the tables in your db:

`$ npm run create-db`

**4+. Not implemented yet**