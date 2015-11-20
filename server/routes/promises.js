import {get} from '../decorators/routes';
import {RoutingError} from '../routing';

export default class Promises {
  users = [];

  @get({ route: '/promises/:id' })
  getPromise (req) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (req.params.id === '42') {
          reject(new RoutingError('Resource not found', 404));
        } else if (req.params.id === '2') {
          reject(new Error('random error'));
        } else if (req.params.id === '0') {
          resolve();
        } else {
          resolve('This promise has been resolved');
        }
      }, 1000);
    });
  }
}
