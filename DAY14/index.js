const fs = require('fs');

// Write File

fs.writeFile('text.txt' , 'Hello world', (err) => {
    if(err){
        console.log('Error creating File');
    }
    else{
        console.log('File created successfully.');
    }
})

// Read File

fs.readFile('text.txt','utf8',(err,data) =>{
    if (err) {
        console.log('Error reading Files');
    }
    else{
        console.log('File content : ', data);
    }
})


//update File

fs.appendFile('text.txt', '\nand this.' , (err) =>{
    if (err) {
        console.log('Error Updating file');
    }
    else{
        console.log('Updating file Successfuly');
    }
})

//deleting File

fs.unlink('text.txt',(err) => {
    if (err) {
        console.log('File not deleted ');
    }
    else{
        console.log('File deleted successfuly');
    }

})
