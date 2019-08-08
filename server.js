const express = require("express");                        // include express
const morgan = require("morgan");                          // include morgan

const blogPostsRouter = require("./blogPostsRouter");      // use blogPosts router
const app = express();                                     // instantiate the app

app.use(morgan("common"));                                // use morgan middleware with common layout
app.use(express.json());                                  // use express.json

app.use("/blog-posts", blogPostsRouter);                 // you need to import `blogPostsRouter` router and route requests to HTTP requests to `/blog-posts` to `blogPostsRouter`

app.listen(process.env.PORT || 8080, () => {                                     // listen on port 8080 for requests.
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});