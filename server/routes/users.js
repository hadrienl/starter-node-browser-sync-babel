import {routes, get, post, patch, del} from '../decorators/routes';

function fakeMiddleware (req, res, next) {
  console.log('I\'m the first middleware');
  next();
}

function anotherFakeMiddleware (req, res, next) {
  console.log('I\'m another middleware');
  next();
}

@routes({
  middlewares: fakeMiddleware
})
export default class Users {
  users = [];

  @get({ route: '/users', middlewares: anotherFakeMiddleware })
  getUsers (req, res) {
    res.json(this.users);
  }

  @post({ route: '/users' })
  createUsers (req, res) {
    let user = {
      id: this.users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };

    this.users.push(user);

    res.json(user);
  }

  @get({ route: '/users/:id', middlewares: [fakeMiddleware, anotherFakeMiddleware] })
  getUser (req, res) {
    let user = this.users.find(user => user.id === +req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  @patch({ route: '/users/:id' })
  updateUsers (req, res) {
    let user = this.users.find(user => user.id === +req.params.id);
    if (user) {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  @del({ route: '/users/:id' })
  deleteUsers (req, res) {
    let user = this.users.find(user => user.id === +req.params.id),
      pos = this.users.indexOf(user);
    if (pos > -1) {
      let user = this.users[pos];
      this.users.splice(pos, 1);
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }
}
