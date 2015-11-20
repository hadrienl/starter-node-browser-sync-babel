import {get} from '../decorators/routes';

export default class Home {
  @get({ route: '/' })
  home (req, res) {
    res.send('Hello Api');
  }
}
