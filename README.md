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

`mysql> create database auth_example;`

Create a databasae called auth_example_test too

`mysql> create database auth_example_test`

P.S: You can choose another name to give to the databases, but remember to update them in **.env** (for the main database) and **.env.test** (for the test database).


**2. Update the environment information**

Update the **.env** file to be able to access your database. The data of this file is used in **src/database/config.js**.

To run tests, you should update **.env.test** as well.

It should look like something like this:
```
DB_NAME=auth_example
DB_USERNAME=root
DB_PASSWORD=your_db_password_here
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

**3. Run database tests**

Run the following command

`npm run test-db`

**4+. Not implemented yet**