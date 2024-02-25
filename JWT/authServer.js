require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

const posts = [
    {
        username : 'Kyle',
        title : 'Post 1'
    },
    {
        username : 'Jim',
        title : 'Post 2'
    }
]



app.get('/posts', (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name));
})

app.post('/login' , (req,res)=>{
    // Authenticate user

    const username = req.body.username;
    const user = {name : username};
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({accessToken : accessToken,refreshToken})
})

function generateAccessToken(user){
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})

}

app.listen(4000);
