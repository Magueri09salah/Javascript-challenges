const express = require('express')
const postRouter = require("./routes/postRoutes");

const app = express();
// app.use(routes);
app.use(express.json())
app.use("/posts",postRouter);

// const posts = require('./posts.json');



app.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
})

