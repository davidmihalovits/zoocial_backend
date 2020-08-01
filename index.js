const express = require("express");
const mongoDB = require("./config/db");
const cors = require("cors");
const auth = require("./auth");
const bodyParser = require("body-parser");
const http = require("http");
const { signup } = require("./routes/signup");
const { login } = require("./routes/login");
const { profile } = require("./routes/profile");
const { users } = require("./routes/users");
const { getAnotherUser } = require("./routes/getAnotherUser");
const { getAnotherUserPosts } = require("./routes/getAnotherUserPosts");
const { postPost } = require("./routes/postPost");
const { deletePost } = require("./routes/deletePost");
const { getMyPosts } = require("./routes/getMyPosts");
const { getAnotherPost } = require("./routes/getAnotherPost");
const { likePost } = require("./routes/likePost");
const { dislikePost } = require("./routes/dislikePost");
const { updateProfile } = require("./routes/updateProfile");
const { follow } = require("./routes/follow");
const { feed } = require("./routes/feed");
const { comment } = require("./routes/comment");
const { getComments } = require("./routes/getComments");
const { search } = require("./routes/search");
const { getNotifications } = require("./routes/getNotifications");
const { readNotification } = require("./routes/readNotification");

const app = express();
const server = http.createServer(app);
mongoDB();
const io = require("socket.io")(server);

app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/signup", signup);
app.post("/login", login);
app.post("/postPost", auth, postPost);
app.post("/comment/:id", auth, comment);
app.post("/search", auth, search);
app.get("/profile", auth, profile);
app.get("/users", auth, users);
app.get("/getAnotherUser/user/:id", auth, getAnotherUser);
app.get("/getAnotherUserPosts/:id", auth, getAnotherUserPosts);
app.get("/getMyPosts", auth, getMyPosts);
app.get("/getAnotherPost/:id", auth, getAnotherPost);
app.get("/feed", auth, feed);
app.get("/getNotifications", auth, getNotifications);
app.get("/getComments/:id", auth, getComments);
app.put("/likePost/:id", auth, likePost);
app.put("/dislikePost/:id", auth, dislikePost);
app.put("/updateProfile", auth, updateProfile);
app.put("/follow/:id", auth, follow);
app.put("/readNotification", auth, readNotification);
app.delete("/deletePost/:id", auth, deletePost);

/*const socketUsers = {};
io.on("connection", (socket) => {
    socket.on("user", (user) => {
        const aUser = { socket: socket, user: user };
        socketUsers[socket.id] = aUser;
        console.log(aUser.socket.id + " connected " + aUser.user.username);
        console.log(socketUsers);
    });

    socket.on("disconnect", () => {
        delete socketUsers[socket.id];
        console.log(socketUsers);
    });
});*/

/*socket.on("like", async (user, post) => {
    if (!post.post.likedBy.includes(user.user._id)) {
        const Notification = require("./models/Notification");

        let newNotification = new Notification({
            notification: `${user.user.username} liked your post!`,
            sender: user.user._id,
            recipient: post.post.by._id,
            read: false,
        });

        await newNotification.save();

        let abc = await u.find((u) => u.id._id === post.post.by._id);
        abc.socket.emit("notification");

        console.log(u);
    }
});*/

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
