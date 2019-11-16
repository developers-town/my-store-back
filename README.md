# my-store-back
This is the API for my-store application one of developers-town project base on online marketing. We use

## Installation 
```
# git clone https://github.com/developers-town/my-store-back.git
# cd my-store-back
# npm install
# npm start
```
## Endpoints

### User
- POST: /api/users/signup     => user registration # { name: { first, last }, email, password, ... }
- POST: /api/users/login      => user login        # { email, password }
- GET:  /api/users/profile    => get user's profile
- PUT:  /api/users/profile    => update user's profile
- GET:  /api/users/:id/calls  => get api request history

### Recycle
- POST: /api/recycle/restore/:id => Restore deleted document by recycle id
- POST: /api/recycle/restore/:model/:id => Restore deleted document by modelName and document id

### CRUD
- GET:    /api/:model       => all documents
- GET:    /api/:model/:id   => get an document by id
- POST:   /api/:model       => create an document
- PUT:    /api/:model/:id   => update an document by id
- DELETE: /api/:model/:id   => delete an document by id

### Query with GET: /api/:model
- Filter by field => GET: /api/:model ? field1Name=field1Value & field2Name=field2Value...
- Select fields => GET: /api/:model ? select[field1Name]=1 & select[field2Name]=1...
- Pagination => GET: /api/:model ? page=1 & limit=20
- Sort => GET: /api/:model ? sort=fieldName & sort=-fieldName

> Space here only for readable purpose!!!

## Features

- Best practice API endpoints
- Filter, sort and pagination within url query
- Control access over resources base on users' roles and permissions
- Minimal file structure

## Documentation

- [Swagger](https://app.swaggerhub.com/apis-docs/nexious/my-store/1.0.0)
- [GitBook](https://my-store-developers-town.gitbook.io/my-store-back/)

## Getting started

### Add new model
Give a definition schema in a new file at /models, then create mongoose model in /models/index.js

### Use routers
Mount routers for new resource (model) by add an json object at /routes/config.json
```json
  {
    "endpoint": "users?",
    "model": "user",
    "routers": ["user", "common"]
  }
```
 * Mountable routers stay at /routes/routers
 
### Create new routers
Or create an new router to mount on a specific resource (model): 
- Create a new file at /routes/routers/ 
- instance an router from express.Router()
- implement desire routes within the router instance, then export the router
- mount to resoures in /routes/config.json

## References

- Express
- Mongoose
- Passport
- JWT
- Accesscontrol
- More+
