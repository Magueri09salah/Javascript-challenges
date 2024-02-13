
const fs = require ('fs');


function readJsonFile(filename){
    return new Promise((resolve,reject)=>{
        fs.readFile(filename, 'utf8', (err,data)=>{
            if (err ){
                reject(new Error(`error reading Json File : ${err.message}` ))
            }
            else{
                try {
                    const parseData = JSON.parse(data);
                    resolve(parseData);
                } catch (error) {
                    reject(new Error(`error parsing JSON : ${error}` ))
                }
            }
        })
    })
}

readJsonFile('output.json').then((jsonData) =>{
    console.log('Data : ', jsonData)
}).catch((error)=>{
    console.log(error.message)
})
