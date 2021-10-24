## Postman link

https://documenter.getpostman.com/view/13203210/UV5afFw6

## Env Variables

Create a config.env file in the server folder and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = abc
JWT_EXPIRES_IN= 1d
JWT_COOKIE_EXPIRE= 1

```

### Run

```
# Run server (:5000)
cd server 
npm start

```
