const router = require("express").Router();
const { collection } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
let User = require("../models/user.model");
require("dotenv").config();

const jwtSecret = process.env.jwtSecret;

//get all user info
router.route("/").get(async (req, res) => {
  try {
    const update = await User.find();
    res.json(update);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user
router.route("/add").post(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      posts: [],
      firstName: "",
      lastName: "",
      email: "",
    });

    await newUser.save();
  } catch (error) {
    res.send(error);
  }
});

//update user info
router.route("/update").post(async (req, res) => {
  try {

    const user = await User.findOneAndUpdate(
      { username: req.body.user },

      {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
      }
    );

    await user.save();

    const update = await User.find();
    res.json(update);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new post
router.route("/newpost").post(auth, async (req, res) => {
  const name = req.body.username;
  const message = req.body.post;

  try {
    const user = await User.findOne({ username: name });

    user.posts.push({
      username: name,
      postTitle: req.body.postTitle,
      postSubject: req.body.postSubject,
      post: message,
      votes: 0,
      comments: [],
    });
    await user.save();

    const update = await User.find();
    res.json(update);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new comment
router.route("/newcomment").post(auth, async (req, res) => {
  const name = req.body.user;
  const message = req.body.post;
  const commentuser = req.body.commentuser;
  const comment = req.body.comment;

  try {
    let user = await User.findOne({ username: name });
    const i = await user.posts.findIndex((x) => x.post == message);
    await user.posts[i].comments.push({
      username: commentuser,
      comment: comment,
    });

    await user.save();

    const update = await User.find();
    res.json(update);
  } catch (err) {
    res.json({ message: err });
  }
});

//sign up
router.route("/signup").post(async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username: username });
    if (user) throw { msg: "User already exist" };

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      posts: [],
      firstName: "",
      lastName: "",
      email: "",
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              jwtSecret,
              // { expiresIn: 10000 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                  },
                });
              }
            );
          })
          .catch((err) => res.status(400).json("Error: " + err));
      });
    });
  } catch (error) {
    res.send(error);
  }
});


//sign in
router.route("/signin").post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });

    if (!user) throw { msg: "user does not exist" };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw { msg: "wrong password" };

    if (isMatch) {
      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              username: user.username,
            },
          });
        }
      );
    }
  } catch (error) {
    //console.log(error);
    res.send(error);
  }
});

//check user password
router.route("/n").get(auth, async (req, res) => {
  await User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ msg: "token not valid" }));
});

//upvote post
// Req.Body --> {users, current, postid}
router.route("/upvote").post(auth, async (req, res) => {
  try {
    //get post's user
    let user = await User.findOne({ username: req.body.user });
    //find post
    const i = await user.posts.findIndex((x) => x._id == req.body.postid);

    //neither upvoted or downvoted by current user
    if (!user.posts[i].downVotes.includes(req.body.current) && !user.posts[i].upVotes.includes(req.body.current)) {
      //+1 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": 1,
          },
        }
      );
      //add user to upvote list and save
      await user.posts[i].upVotes.push(req.body.current);
      await user.save();
    }

    //already upvoted by current user
    else if (user.posts[i].upVotes.includes(req.body.current)) {
      // -1 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": -1,
          },
        }
      );
      //remove user from upvote list and save
      const newuser = user.posts[i].upVotes.filter(function (val, i, arr) {
        return val != req.body.current;
      });
      user.posts[i].upVotes = newuser;
      await user.save();
    }

    //already downvoted by current user
    else if (user.posts[i].downVotes.includes(req.body.current)) {
      // +2 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": 2,
          },
        }
      );
      //add user to upvote list, remove from downvote list, and save
      await user.posts[i].upVotes.push(req.body.current);
      const newuser = user.posts[i].downVotes.filter(function (val, i, arr) {
        return val != req.body.current;
      });
      user.posts[i].downVotes = newuser;
      await user.save();
    }
    
    const update = await User.find();
    res.json(update);
  } 
  catch (err) {
    res.json({ msg: "error" });
  }
});

//downvote post
// Req.Body --> {users, current, postid}
router.route("/downvote").post(auth, async (req, res) => {
  try {
    //get post's user
    let user = await User.findOne({ username: req.body.user });
    //find post
    const i = await user.posts.findIndex((x) => x._id == req.body.postid);

    //neither upvoted or downvoted by current user
    if (!user.posts[i].downVotes.includes(req.body.current) && !user.posts[i].upVotes.includes(req.body.current)) {
      //-1 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": -1,
          },
        }
      );
      //add user to downvote list and save
      await user.posts[i].downVotes.push(req.body.current);
      await user.save();
    }

    //already downvoted by current user
    else if (user.posts[i].downVotes.includes(req.body.current)) {
      // +1 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": +1,
          },
        }
      );
      //remove user from downvote list and save
      const newuser = user.posts[i].downVotes.filter(function (val, i, arr) {
        return val != req.body.current;
      });
      user.posts[i].downVotes = newuser;
      await user.save();
    }

    //already upvoted by current user
    else if (user.posts[i].upVotes.includes(req.body.current)) {
      // -2 vote
      await User.updateOne(
        {
          "posts._id": req.body.postid,
        },
        {
          $inc: {
            "posts.$.votes": -2,
          },
        }
      );
      //add user to downvote list, remove from upvote list, and save
      await user.posts[i].downVotes.push(req.body.current);
      const newuser = user.posts[i].upVotes.filter(function (val, i, arr) {
        return val != req.body.current;
      });
      user.posts[i].upVotes = newuser;
      await user.save();
    }
    
    const update = await User.find();
    res.json(update);
  } 
  catch (err) {
    res.json({ msg: "error" });
  }
});

//remove comment
router.route("/deletecomment").post(auth, async (req, res) => {
  try {
    //find user
    let user = await User.findOne({ username: req.body.user });
    //find post
    const i = await user.posts.findIndex((x) => x._id == req.body.postid);
    //find comment
    const j = await user.posts[i].comments.findIndex((y) => y._id == req.body.commentid);
    //remove comment
    await user.posts[i].comments.splice(j, 1,);
    //save and update
    await user.save();
    const update = await User.find();
    res.json(update);

    // res.json( {msg : user.posts[i].comments[j]._id})

  } catch (err) {
    res.json({ message: "error" });
  }
});

//remove post
router.route("/deletepost").post(auth, async (req, res) => {
  try {
    //find user
    let user = await User.findOne({ username: req.body.user });
    //find post
    const i = await user.posts.findIndex((x) => x._id == req.body.postid);
    //remove post
    await user.posts.splice(i, 1,);
    //save and update
    await user.save();
    const update = await User.find();
    res.json(update);

  } catch (err) {
    res.json({ message: "error" });
  }
});

module.exports = router;










// //upvote post
// router.route("/upvote").post(auth, async (req, res) => {
//   try {
//     //get user
//     let user = await User.findOne({ username: req.body.user });
//     //find post
//     const i = await user.posts.findIndex((x) => x._id == req.body.postid);


//     if (user.posts[i].downVotes.includes(req.body.current)) {

//       await User.updateOne(
//         {
//           "posts._id": req.body.postid,
//         },
//         {
//           $inc: {
//             "posts.$.votes": 1,
//           },
//         }
//       );
//       const newuser = user.posts[i].downVotes.filter(function (val, i, arr) {
//         return val != req.body.current;
//       });
//       user.posts[i].downVotes = newuser;
//       await user.save();

//     } else if (!user.posts[i].upVotes.includes(req.body.current)) {

//       await User.updateOne(
//         {
//           "posts._id": req.body.postid,
//         },
//         {
//           $inc: {
//             "posts.$.votes": 1,
//           },
//         }
//       );
//       await user.posts[i].upVotes.push(req.body.current);
//       await user.save();
      
//     }

//     const update = await User.find();
//     res.json(update);
//   } catch (err) {
//     res.json({ message: "error" });
//   }
// });

// //downvote post
// router.route("/downvote").post(auth, async (req, res) => {
//   try {
//     let user = await User.findOne({ username: req.body.user });
//     const i = await user.posts.findIndex((x) => x._id == req.body.postid);

//     if (user.posts[i].upVotes.includes(req.body.current)) {
//       await User.updateOne(
//         {
//           "posts._id": req.body.postid,
//         },
//         {
//           $inc: {
//             "posts.$.votes": -1,
//           },
//         }
//       );

//       const newuser = user.posts[i].upVotes.filter(function (val, i, arr) {
//         return val != req.body.current;
//       });
//       user.posts[i].upVotes = newuser;
//       await user.save();
//     } else if (!user.posts[i].downVotes.includes(req.body.current)) {
//       await User.updateOne(
//         {
//           "posts._id": req.body.postid,
//         },
//         {
//           $inc: {
//             "posts.$.votes": -1,
//           },
//         }
//       );

//       await user.posts[i].downVotes.push(req.body.current);
//       await user.save();
//     }

//     const update = await User.find();
//     res.json(update);
//   } catch (err) {
//     res.json({ message: "error" });
//   }
// });