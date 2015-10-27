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
