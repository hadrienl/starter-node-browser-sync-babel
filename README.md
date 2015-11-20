# starter-node-browser-sync-babel
An app starter to begin a beautiful project with nodejs and babel

# Installation

You need nodejs 4.x. I suggest you to use nvm to be able to pick the correct version for your project.

```
npm install
```

# Usage

* `npm run server` will run the server only which will be accessible from http://localhost:3000
* `npm run watch` will watch server files and rebuild, then restart the server
* `npm run dev` will run both server and client and serve and proxy them with browsersync and watch server

# Structure

Server side code is located into `server` folder and will be transpiled into `dist/server` folder.
Client side code is located into `client` folder and will be copied into `dist/client` folder.

## Routes

Routes classes are located in `server/routes` folder and will automatically be loaded on app start. This classes must
be a `export default` and should use decorators `get`, `post`, `put`, `patch`, `del` and `middlewares`.

Each method take `request`, `response` and `next` as parameter. The method may call a response's method like
`response.send('result')` or return a promise. If the promise resolve with a string, the string will be sent
to client. If it resolve with an object, a json will be send. If it rejects with an Error, it will send a 500
error. If it reject with a RoutingError, it will send the code error set in the error object.

### @middlewares

This decorator must be set on a route class. It's goal is to define one or many middlewares on all the routes
of the class.

* `middlewares`: Middlewares to apply on each routes of this class. Must be a `function` or array of `function`s.

### @get, @post, @patch, @put, @del

Each method can have one or many method set. This decorator take the following params:

* `route`: The route when the method will be fire
* `middlewares`:  The middlewares to apply to the route. Must be a `function` or array of `function`s.

It will link the method and the express router.

### Exemple

```
// server/routes/users.js
import {middlewares, get, post, patch, del} from '../decorators/routes';
import {RoutingError} from '../routing';
import {myMiddleware} from './my-middleware';
import {authMiddleware} from './auth';

@middlewares(myMiddleware)
export default class Users {
  @get({ route: '/users' })
  getUsers (req, res) {
    res.send({id: 1});
  }
  
  @get({ route: '/users/:id' })
  getUser (req, res) {
    res.send({id: 1});
  }
  
  @post({ route: '/users/id', middlewares: authMiddleware })
  createUser (req, res) {
    
  }
  
  @patch({ route: '/users/:id', middlewares: authMiddleware })
  updateUser (req, res) {
    
  }
  
  @del({ route: '/users/:id', middlewares: authMiddleware })
  deleteUser (req, res) {
    
  }

  @get({ route: '/users/lag' })
  getUsersWithLag (req, res) {
    return new Promise((resolve, reject) => setTimeout(() => resolve({id: 1}), 1000));
  }
  @get({ route: '/users/error' })
  getUsersWithError (req, res) {
    return new Promise((resolve, reject) => setTimeout(() => reject(new RoutingError('not found', 404)), 1000));
  }

  // You also can use async keyword
  @get({ route:'/users/async' })
  async getUsersAsync (req, res) {
    const users = await asyncService.getUsers();

    if (users.length) {
      return users;
    }

    throws new RoutingError('No user found', 404);
  }
}
```
