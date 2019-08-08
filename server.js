const express = required('express');       // include express from installed dependencies
const app = express();                     // instantiate app using express.

const {router} = require("./router");      // import the route model

app.use('./blogposts', router);            // route requests to blogposts and router.

app.listen(process.env.PORT || 3000, function() {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}...`);     // app.listen commands the server to listen for client requests on port 3000 and log when it begins listening
});      