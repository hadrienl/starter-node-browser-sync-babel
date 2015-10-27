export default class Home {
  constructor (app) {
    app.get('/', (...args) => this.home(...args));
  }

  home (req, res) {
    res.send('Hello Api');
  }
}
