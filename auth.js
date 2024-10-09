
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');
// Passport configuration
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // console.log("Received Credentials", username, password);
        const user = await Person.findOne({ username });
        if (!user) {
            return done(null, false, { message: "Incorrect Username" });
        }
        const isPasswordMatch = user.comparePassword(password); // Adjust if using hashed passwords
        if (!isPasswordMatch) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;