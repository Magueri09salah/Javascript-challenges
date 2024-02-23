const express = require('express');
// Adding validator :
const { body, validationResult, matchedData  } = require('express-validator');
const app = express();

app.use(express.json());


app.get('/home', (req,res)=>{
    res.json({message : "Welcome Home"});
});

const users = {
    email : "maguerisalaheddinegmail.com",
    message : "Hello world",
    phone : "+212637828163"
}

const baseEmailChain = () => body('email').isEmail();
const baseMessageChain = () => body('message').notEmpty();
const basephoneChain = () => body('phone').optional().isMobilePhone()

app.post('/sign-in', [baseEmailChain(),baseMessageChain(),basephoneChain()],(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        const data = matchedData(req);
        return res.send({
            email : data.email,
            message : data.message,
            phone : data.phone,
        });
    }
    res.send({errors : result.array()});
})


app.listen(3000);
