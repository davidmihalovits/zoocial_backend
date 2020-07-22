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
const { likePost } = require("./routes/likePost");
const { dislikePost } = require("./routes/dislikePost");
const { updateProfile } = require("./routes/updateProfile");
const { follow } = require("./routes/follow");
const { feed } = require("./routes/feed");

const app = express();
const server = http.createServer(app);
mongoDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/signup", signup);
app.post("/login", login);
app.post("/postPost", auth, postPost);
app.get("/profile", auth, profile);
app.get("/users", auth, users);
app.get("/getAnotherUser/user/:id", auth, getAnotherUser);
app.get("/getAnotherUserPosts/:id", auth, getAnotherUserPosts);
app.get("/getMyPosts", auth, getMyPosts);
app.get("/feed", auth, feed);
app.put("/likePost/:id", auth, likePost);
app.put("/dislikePost/:id", auth, dislikePost);
app.put("/updateProfile", auth, updateProfile);
app.put("/follow/:id", auth, follow);
app.delete("/deletePost/:id", auth, deletePost);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
