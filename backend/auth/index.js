import { Strategy, ExtractJwt } from "passport-jwt";

export default function setupJWTStrategy(passport) {
    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "showMeThePets"
        }, function(payload, done) {
            try {
                return done(null, payload.user);
            } catch (e) {
                return done(e, null);
            }
        })
    );
};