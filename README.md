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

# Decorators

## Routes

Routes classes are located in `server/routes` folder and will automatically be loaded on app start. This classes must
be a `export default` and should use decorators `routes` and `get`, `post`, `put`, `patch`, `del`.

### @routes

This decorator must be set on a route class. It's job is to set automatically all the routes. This decorator take the following params:

* `middlewares`: Middlewares to apply on each routes of this class. Must be a `function` or array of `function`s.

### @get, @post, @patch, @put, @del

Each method can have a or many method set. This decorator take the following params:

* `route`: The route when the method will be fire
* `middlewares`:  The middlewares to apply to the route. Must be a `function` or array of `function`s.

### Exemple

```
// server/routes/users.js
import {routes, get, post, patch, del} from '../decorators/routes';
import {myMiddleware} from './my-middleware';
import {authMiddleware} from './auth';

@routes({
  middlewares: myMiddleware
})
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
}
```
