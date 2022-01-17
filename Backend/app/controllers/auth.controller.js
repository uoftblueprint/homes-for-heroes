const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = {
  async signUp(req, res) {
    // const { name, phone, email, password } = req.body;
    if(req.user)
      res.send('Success');
    else
      res.send('Unsuccessful')
  },
  async login(req, res, next) {
    const { email, password } = req.body;
    passport.authenticate('login', async (err, customer, msg) => {
      try {
        if (err || !customer) return next(err || msg.message || new Error('An error occured.'))

        req.login(customer, {session: false},
          async (err) => {
            if (err) return next(err);

            const body = {id: customer.id, email: customer.email};
            const token = jwt.sign({ user: body }, 'CHANGE_ME');

            return res.json({ token })
          });
      } catch (err) {
        return next(error);
      }
    })(req, res, next);
  }
}

module.exports = authController;
