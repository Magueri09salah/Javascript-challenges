const posts = require('../posts.json');
const fs = require('fs');

function getAllPosts(){
        // console.log(posts);
        return posts;
}

function getPostsById(id){
    let postobj = posts.find(post => post.id == id);
    if(!postobj){
        console.log("id does not exist");
        return;
    }
    return postobj ;

}

function searchPost(title){
    let selectedPost = posts.filter(post => post.title.toLowerCase().includes(title));
    if(!selectedPost){
        console.log("tilte does not exist");
        return;
    }
    return selectedPost;
}

function createPost(element){
    // let posts = getAllPosts();
    let postsData = posts;
    // posts.push(element);

    // fs.writeFile('./posts.json', JSON.stringify(posts), (err) => {
    //     if(err){
    //         console.log("error writing file", err);
    //     } else {
    //         console.log('File successfully written');
    //     }
    // });

    // return posts;
    postsData.push(element);

    fs.writeFile('./posts.json', JSON.stringify(postsData), (err) => {
        if(err){
            console.log("error writing file", err);
        } else {
            console.log('File successfully written');
        }
    });

    return postsData;
}

function updatePost(id,data){
    // console.log();
    const post = getPostsById(id);
    if(!post){
        throw new Error('post not found');
    }
    // console.log('dsjhsgjsdgsjsdjsgdjsgdjsgdjsgdhgsjdgsjdgsjdgjsgdjsgdshgdjsgdjdsg',id,data);
    let updated = {...post,...data};
    // console.log('this is updated' , updated);
    let index = posts.indexOf(post);
    // console.log('yhis ois',index);
    posts[index] = updated;
    // console.log('this post' , post[index]);
    fs.writeFile("../posts.json", JSON.stringify(posts),(err)=>{
        if (err) {
            throw err;
        }
        console.log('gooooooooooooooooooooooooood');
    });
    return updated;
}


module.exports = {getAllPosts,getPostsById,searchPost,createPost,updatePost};
