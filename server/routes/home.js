import {routes, get} from '../decorators/routes';

@routes
export default class Home {
  @get({ route: '/' })
  home (req, res) {
    res.send('Hello Api');
  }
}
