const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt");

module.exports = (app, client, UserModel) => {
	//takes the db client to store the sessions
	const store = new MongoStore({ mongooseConnection: client.connection });

	//mount middlewares
	app.use(
		session({
			store,
			key: "express.sid",
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: { secure: false }, //requires https
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	//serialize deserialize
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id, done) => {
		UserModel.findById(id, (err, doc) => {
			if (err) {
				console.log("error on _deserializeUser_: " + err);
				done(err);
			} else if (!doc) {
				console.log("non serialized user attempted to connect with id: " + id);
				done(null, false);
			} else {
				done(null, doc); //will be saved to req.user
			}
		});
	});

	//authenticating using local strategy
	passport.use(
		new LocalStrategy((username, password, done) => {
			console.log("Attempting to login- username: " + username);
			UserModel.findOne({ username }, (err, doc) => {
				if (err) {
					console.log("error on _LocalStrategy_: " + err);
					return done(err);
				} else if (!doc) {
					console.log("login failed: invalid username: " + username);
					return done(null, false, { message: "Invalid username" });
				} else if (!bcrypt.compareSync(password, doc.password)) {
					console.log("login failed: invalid password: username: " + username);
					return done(null, false, { message: "Wrong password" });
				} else {
					console.log("login successful: username: " + doc.username);
					return done(null, doc);
				}
			});
		})
	);
};
