const express = require("express");
const router = express.Router();

const { BlogPosts } = require("./models");

function lorem() {                                                                              // convenience function for generating lorem text for blog posts we initially add below
  return (
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
    "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
}


BlogPosts.create("10 things -- you won't believe #4", lorem(), "Billy Bob");                 // seed some posts so initial GET requests will return something
BlogPosts.create("Lions and tigers and bears oh my", lorem(), "Lefty Lil");

router.get("/", (req, res) => {                                                              // add endpoint for GET. 
  res.json(BlogPosts.get());                                                                 // It should call `BlogPosts.get()` and return JSON objects of stored blog posts send back JSON representation of all blog posts on GET requests to root.
});


router.post("/", (req, res) => {                                                        // add endpoint for POST requests, which should cause a new blog post to be added (using `BlogPosts.create()`).  
  const requiredFields = ["title", "content", "author"];                                // ensure `name` and `budget` are in request body
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);                                            // This endpoint should send a 400 error if the post doesn't contain `title`, `content`, and `author`. 
    }
  }
  const item = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(item);                                                                 // It should return a JSON object representing the new post (including the id, which `BlogPosts` will create.
});


router.put("/:id", (req, res) => {                                                          // add endpoint for PUT requests to update blogposts.
  const requiredFields = ["id", "title", "content", "author", "publishDate"];               // it should also ensure that the id in the object representing the post matches the id of the path variable, and that the following required fields are in request body: `id`, `title`, `content`, `author`, `publishDate`
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${
      req.params.id
    }) and request body id ``(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  BlogPosts.update({                                                                     //  it should call `BlogPosts.update()` and return the updated post.
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});


router.delete("/:id", (req, res) => {                                              // add endpoint for DELETE requests. These requests should have an id as a URL path variable and call `BlogPosts.delete()`
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;