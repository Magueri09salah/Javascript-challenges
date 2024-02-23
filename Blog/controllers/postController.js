const  posts  = require("../models/post");
const postsData = require('../posts.json');
// const fs = require("fs");


function getPosts(req,res) {
    res.json(posts.getAllPosts());
}

function getPostsId(req,res) {
    let id = req.params.id;
    if(parseInt(id) <= 0){
        res.status(404).json({Error : 'invalid id'});
        return
    }
    res.json(posts.getPostsById(id));
}

function getPostsSearch(req,res){
    let title = req.query.title.toLowerCase();
    if(!title){
        res.status(404).json({Error : 'invalid title'});
        return;
    }
    res.json(posts.searchPost(title));
}

function postCreatePost(req,res){

    const {title,body,userId,tags,reactions} = req.body;

    if(!title || !body || !userId || !tags || !reactions){
        res.status(404).json({Error : 'Post is empty'});
        return;
    }
    let id = postsData.length + 1 ;
    posts.createPost({id,title,body,userId,tags,reactions});

    res.json({message : 'post created'});

}

function putUpdatePost(req,res){
    const postId = parseInt(req.params.id);
    let {id,title,body,userId,tags,reactions} = req.body;
    // let  dataToUpdate({id,title,body,userId,tags,reactions}) =  req.body;
    let dataToUpdate = {id, title, body, userId, tags, reactions};
    // console.log({id,title,body,userId,tags,reactions});
    if (dataToUpdate.title || dataToUpdate.body || dataToUpdate.userId || dataToUpdate.tags || dataToUpdate.reactions) {
        posts.updatePost(postId,dataToUpdate);
        // posts.updatePost({postId,dataToUpdate}); 3lach object
        res.status(201).json({message : 'post updated'});
        return
    }
    res.status(404).json({Error : 'Post is empty'});

}



module.exports = {getPosts,getPostsId,getPostsSearch,postCreatePost,putUpdatePost}
