const fs = require("fs").promises;

const path = "./posts.json";

async function getAllPosts() {
  try {
    let data = await fs.readFile(path, { encoding: "utf-8" });
    let p_obj = JSON.parse(data);
    return p_obj.posts;
  } catch (err) {
    console.log(err.message);
  }
}

function createPost(author, title, text, desc) {
  return { author: author, title: title, text: text, description: desc };
}


console.log(createPost("Zaka", "test", "asdf","3243214"));
module.exports = {
  getAllPosts,
  createPost,
};
