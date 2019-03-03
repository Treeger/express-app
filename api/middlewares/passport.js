import fs from 'fs';
import passport from 'passport'
import passportJWT from "passport-jwt"

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const passportJWTStrategy = passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: fs.readFileSync("./config/public.key", 'utf8')
    },
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));
