const { getAllPosts, createPost } = require("../models/post");
const path = "./posts.json";
const fs = require("fs").promises;

async function getPosts(req, res) {
  try {
    let posts = await getAllPosts();
    res.send(posts); 
    return;
  } catch (err) {
    res.status(404).json(err.message);
  }
}

async function findPost(req, res) {
  try {
    let id = req.params.id;
    let posts = await getAllPosts();
    let post = posts.find((p) => p.id == id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (err) {
    res.status(404).json(err);
  }
}

async function create_Post(req, res) {
  try {
    let posts_arr = await getAllPosts();
    let { author, title, description, text } = req.body;

    let id = posts_arr.length + 1;
    let sub_post = createPost(author, title, text, description);
    let post = { id: id, ...sub_post };

    posts_arr.push(post);

    await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));

    res.json(posts_arr);
  } catch (err) {
    console.log(err.message);
    res.status(404).json(err);
  }
}

async function updatePost(req, res) {
  try {
    let id = Number(req.params.id);
    let { author, title, description, text } = req.body;

    let post_arr = await getAllPosts();
    let post_index = post_arr.findIndex((p) => p.id === id);
    if (post_index === -1) res.status(404).json("Post not found");
    else {
      //   post_arr[post_index] = {
      //     ...post_arr[post_index],
      //     author: author,
      //     title: title,
      //     description: description,
      //     text: text,
      //   };
      post_arr[post_index].author = author;
      post_arr[post_index].title = title;
      post_arr[post_index].description = description;
      post_arr[post_index].text = text;

      await fs.writeFile(path, JSON.stringify({ posts: post_arr }));
      res.json(post_arr[post_index]);
    }
  } catch (err) {
    res.status(404).json(err);
  }
}

async function deletePost(req, res) {
  try {
    let id = Number(req.params.id);
    let posts_arr = await getAllPosts();
    let post_index = posts_arr.findIndex((p) => p.id === id);
    if (post_index === -1) res.status(404).json("Not Found");
    else {
      posts_arr.splice(post_index, 1);
      await fs.writeFile(path, JSON.stringify({ posts: posts_arr }));
      res.json(posts_arr);
    }
  } catch (err) {
    res.status(404).json(err);
  }
}

module.exports = {
  getPosts,
  findPost,
  create_Post,
  updatePost,
  deletePost,
};
