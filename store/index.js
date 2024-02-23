const express =  require('express');
const fs = require('fs');
const app = express();
const phones = require("./phones.json");


app.use(express.json())

app.get("/phones", (req,res)=>{
    res.json(phones);
})

app.post("/phones",(req,res)=>{
    const newPhone = req.body;
    phones.push(newPhone);
    fs.writeFile('./phones.json', JSON.stringify(phones),(err)=>{
        if(err){
            res.status(404).json({message : "An error Has accured"})
        }else{
            res.json(newPhone);
        }

    })
}) 

app.put("phones/:id", (req,res)=>{
    let target = phones.find(p=>p.id == req.params.id);
    if(!target){
        res.status(404).json({message : "not found"});
        return;
    }

    let newPhone = {...target, ...raq.body};
    let index = phones.indexOf(target);
    phones[index] = newPhone;
    fs.writeFile('./phones.json', JSON.stringify(phones),(err)=>{
        if(err){
            res.status(400).json({message : "An error Has accured"})
        }else{
            res.json(newPhone);
        }
    })
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});
