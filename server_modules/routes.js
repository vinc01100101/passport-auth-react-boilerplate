const passport = require("passport");
const flash = require("express-flash");
const bcrypt = require("bcrypt");

module.exports = (app, UserModel) => {
	app.use(flash());
	//function for checking if the user is authenticated
	const checkIfAuthenticated = (req, res, next) => {
		req.isAuthenticated() ? next() : res.redirect("/");
	};
	//function for checking if the user is NOT authenticated
	const checkIfNotAuthenticated = (req, res, next) => {
		req.isAuthenticated() ? res.redirect("/profile") : next();
	};
	//function for rendering pug
	const renderPug = (res, value) => {
		res.render("../dist/index.pug", value);
	};

	app.get("/", checkIfNotAuthenticated, (req, res) => {
		renderPug(res, { page: "Home", errorDom: req.flash("error") });
	});
	app.get("/register", checkIfNotAuthenticated, (req, res) => {
		renderPug(res, { page: "Register", errorDom: req.flash("error") });
	});
	//profile page needs to check if user is authenticated
	app.get("/profile", checkIfAuthenticated, (req, res) => {
		renderPug(res, { page: "Profile" });
	});

	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.post(
		"/login",
		checkIfNotAuthenticated,
		passport.authenticate("local", {
			successRedirect: "/profile",
			failureRedirect: "/",
			failureFlash: true,
		})
	);

	app.post(
		"/register",
		checkIfNotAuthenticated,
		(req, res, next) => {
			const username = req.body.username.toLowerCase();
			const regex = /^\w+$/i;

			if (!regex.test(username)) {
				res.send("invalid username");
			} else {
				UserModel.findOne({ username }, (err, doc) => {
					if (err) return next(err);
					if (doc) {
						console.log(
							"registration failed: username already exists: " +
								username
						);

						renderPug(res, {
							page: "Register",
							errorDom: "username already exists",
							prevValues: JSON.stringify({ username }),
						});
						return;
					}
					const hash = bcrypt.hashSync(req.body.password, 12);
					const newDoc = new UserModel({
						username,
						password: hash,
					});
					newDoc.save((err, usr) => {
						if (err) {
							console.log(
								"Error upon creation of the new user doc"
							);
							return next(err);
						}
						next(null, usr);
					});
				});
			}
		},
		passport.authenticate("local", {
			successRedirect: "/profile",
			failureRedirect: "/register",
			failureFlash: true,
		})
	);

	//for invalid page/route
	app.use((req, res) => {
		res.status(404).end();
	});
};
