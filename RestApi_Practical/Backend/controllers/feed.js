const { validationResult } = require("express-validator");
const Post = require("../models/post");
const post = require("../models/post");
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res
        .status(200)
        .json({ message: "fetched post successfully", posts: posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  // res.status(200).json({
  //   posts: [
  //     {
  //       _id: "1",
  //       title: "First Post",
  //       content: "This is the first post!",
  //       imageUrl: "images/book.jpeg",
  //       creator: {
  //         name: "Ankita",
  //       },
  //       createdAt: new Date(),
  //     },
  //   ],
  // });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation  failed, entered Data  is incorrect");
    error.statusCode = 422;
    throw errow;
    // return res.status(422).json({
    //   message: "validation failed , entered data is incorrect",
    //   errors: errors.array(),
    // });
  }
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/book.jpeg",
    creator: { name: "Ankita" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not found post");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "POst fetched", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
