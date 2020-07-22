const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username.length < 1 || username.length > 12) {
        return res.json({ status: "Enter your username, max 12 characters." });
    }

    if (!email.match(regEx)) {
        return res.json({ status: "Invalid email." });
    }

    if (password.length < 6) {
        return res.json({ status: "Password must be at least 6 characters." });
    }

    try {
        let emailTaken = await User.findOne({ email }).populate(
            "following followers posts"
        );
        if (emailTaken) {
            return res.json({ status: "This email is already taken." });
        }

        let usernameTaken = await User.findOne({ username }).populate(
            "following followers posts"
        );
        if (usernameTaken) {
            return res.json({ status: "This username is already taken." });
        }

        user = new User({
            username,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: "365d",
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
    } catch (err) {
        console.error(err.message);
        return res.json({ status: "Server error, signup failed." });
    }
};
