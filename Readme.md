# Flutter project backend

## Instalation 

first you need node installed in your machine [node installation](https://nodejs.org/en/download/package-manager)

and mongodb as database [installation link](https://www.mongodb.com/try/download/community)

and you need to add this `.env` file :

```
JWT_SECRET=<generated token secret>
CONNECT_DB_URI=mongodb://localhost:27017/food-delivery
PORT=3005
```

to generate token secret you can viste this [site](https://jwtsecret.com/generat)

then init database using this commands:

> \$ node db/initdata <br/>
> \$ npm install

### Run server

to run application just use the command:

> npm start

then access the server on: http://localhost:3005