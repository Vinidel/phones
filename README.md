# Belong phones API

 Simple api to query phones of a user and activate it

## Getting started

- Install the application dependencies

  ```shell
  npm install
  ```

* Run unit test

  ```shell
  npm test
  ```

* Run DB in docker detached

  ```shell
  docker-compose up -d
  ```

* Run migrations

  ```shell
  npm run db:migrate
  ```

* Run seeds

  ```shell
  npm run db:seed:all
  
  It will add a few phone numbers for User of id 1 and one user with no phone with id 2
    
  ```
  

* Start server

  ```shell
  npm start
  ```

* Start dev mode server

  ```shell
  npm run start:dev
  ```

 ## Routes
  ### Get all phones
  ```javascript
    GET  http://localhost:3000/phones
    [
        {
            "id": 2,
            "isActive": false,
            "phoneNumber": "0456556545",
            "userId": 1,
            "createdAt": "2020-09-23T06:26:56.134Z",
            "updatedAt": "2020-09-23T06:26:56.134Z"
        },
    ]
 ```
  
  ### One phone by id
  ```javascript
    GET  http://localhost:3000/phones/:id
    {
            "id": 2,
            "isActive": false,
            "phoneNumber": "0456556545",
            "userId": 1,
            "createdAt": "2020-09-23T06:26:56.134Z",
            "updatedAt": "2020-09-23T06:26:56.134Z"
    },  
  ```
  
  ### Activate phone
  Handler sets isActive to true always
  ``` Javascript
    PATCH http://localhost:3000/phones/:id
    {
        "isActive": true
    }
  ```
  
  ### User phones
  Response
  ``` Javascript
     GET http://localhost:3000/users/:id
    {
        "id": 1,
        "name": "Vinny Del",
        "createdAt": "2020-09-23T05:49:23.532Z",
        "updatedAt": "2020-09-23T05:49:23.532Z",
        "Phones": [
            {
                "id": 2,
                "isActive": false,
                "phoneNumber": "0456556545",
                "userId": 1,
                "createdAt": "2020-09-23T06:26:56.134Z",
                "updatedAt": "2020-09-23T06:26:56.134Z"
            },
    }
  ```


## Things missing/to improve

- Anyone can update a phone
- Validation middleware for model properties
- Authentication
- Use string query to limit data
- Swagger
