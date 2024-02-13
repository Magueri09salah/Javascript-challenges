function makeRequest(location){
    return new Promise((resolve, reject)=>{
        console.log('Making request to :' , location);
        if(location ==='Google'){
            resolve('say hi to : ' , location );
        }
        else{
            reject('We can onlu talk to google')
        }
    })
}

function processRequest(response){
    return new Promise((resolve,reject) => {
        console.log('processing response')
        resolve('Extra infos: ', response);
    } )
}

async function doWork(){
    const response = await makeRequest('Google');
    console.log('Response received');
    const process = await processRequest(response);
    console.log(process);
}


doWork();
