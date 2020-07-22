const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    const { username, image, age, gender, bio, location, website } = req.body;

    const updatedUser = {};

    if (username) updatedUser.username = username;
    if (image) updatedUser.image = image;
    if (age) updatedUser.age = age;
    if (gender) updatedUser.gender = gender;
    if (bio) updatedUser.bio = bio;
    if (location) updatedUser.location = location;
    if (website) updatedUser.website = website;

    try {
        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updatedUser },
            { new: true }
        );
        let u = await User.findById(req.user.id).populate(
            "posts followers following"
        );

        return res.json(u);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
};
