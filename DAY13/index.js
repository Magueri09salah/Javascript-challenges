
function show(){
    return new Promise((resolve,reject)=>{
        let i = 0 ;
        while (i < 10000) {
            console.log(i);
            i++;
        }
    resolve("Show method ended");
    })

}


function sum(a,b){

    console.log(a+b);
}

show().then(value => console.log(value));
sum(5,3);
console.log();
