import { Strategy as jwtStrategy, ExtractJwt as jwtExtract } from 'passport-jwt';
import { jwtSecret } from '../config/keys';
import User from '../models/User';

const options = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const passportVerification = passport => {
  passport.use(new jwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id).then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }).catch(error => console.log(error));
  }))
}

export default passportVerification;