# starter-node-browser-sync-babel
An app starter to begin a beautiful project with nodejs and babel

# Installation

You need nodejs 4.x. I suggest you to use nvm to be able to pick the correct version for your project.

```
npm install
```

# Usage

* `npm run server` will run the server only which will be accessible from http://localhost:3000
* `npm run watch
* `npm run dev` will run both server and client and serve and proxy them with browsersync and watch server

# Structure

Server side code is located into `server` folder and will be transpiled into `dist/server` folder.
Client side code is located into `client` folder and will be copied into `dist/client` folder.

# Decorators

## Routes

Routes classes are located in `server/routes` folder and will automatically loaded on app start. This classes
should use decorators `routes` and `get`, `post`, `put`, `patch`, `del`.

### @routes

This decorator must be set on a route class. It's job is to set automatically all the routes. There is no parameter.

### @get, @post, @patch, @put, @del

Each method can have a or many method set. This decorator take some params :

* `route`: The route when the method will be fire
* `middlewares`:  The middlewares to attach to the route

### Exemple

```
// server/routes/users.js
import {routes, get, patch} from '../decorators'

@routes
export class Users {
  @get({ route: '/users' })
  getUsers (req, res) {
    res.send({id: 1});
  }
  
  @get({ route: '/users/:id' })
  getUser (req, res) {
    res.send({id: 1});
  }
  
  @post({ route: '/users/id' })
  createUser (req, res) {
    
  }
  
  @patch({ route: '/users/:id' })
  updateUser (req, res) {
    
  }
  
  @del({ route: '/users/:id' })
  deleteUser (req, res) {
    
  }
}
```
