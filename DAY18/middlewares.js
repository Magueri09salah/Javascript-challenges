const express = require('express');
const { read } = require('fs');


app = express();

app.use(logger);

// // // Middleware 1: Logging middleware
// app.use((req,res,next) =>{

// //     // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
// //     console.log('heeeeeey');
// //     next();
// })

// // // Middleware 2: Authentication middleware
// app.use((req,res,next)=>{
//     // In a real application, you would perform actual authentication logic here
//     const isAuthenticated = true; // For the sake of example, assuming the user is authenticated
//     if(isAuthenticated){
//         next();
//     } else {
//         res.status(404).send(Unauthorized);
//     }

// })

app.get('/example',auth,(req,res)=>{
    console.log(`User is admin = ${req.admin}`);
    console.log('Handling the example route');
    res.send('Hello this is the response !');
})

app.get('/',  (req,res)=>{
    console.log('Handling STARTS');
    res.send('Hello this is the response here !');
})

function logger(req,res,next){
    console.log(req.originalUrl);
    next();
}

function auth(req,res,next){
    if(req.query.admin === "true"){
        req.admin = true;
        next();
    }
    else{
        res.send('No auth');
    }
}



app.listen(3000, ()=>{
    console.log(`server is running`);
})
