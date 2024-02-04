const fs = require('fs');

async function fetchData() {
    try {
        const data = await fetch("https://dummyjson.com/users");
        const result = await data.json();
        return result.users;
    } catch (error) {
        console.log('FATAL ERROR: ', error.message);
    }
}

async function MapsUser () {
    try {
        const data = await fetchData();
        const names = data.map(item => item.firstName);
        const age = data.map(item => item.age)
        for (let i = 0; i < names.length; i++) {

        console.log(`Name : ${names[i]}\t ,Age: ${age[i]}`);
    }
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

//MapsUser();


async function processUserData () {
    try {
        console.log("Processed Users: ");
        console.log("*****************");
        const data = await fetchData();
        const active = data.filter(item => item.gender=="male");
        const names = active.map(({ firstName, maidenName, lastName }) => `${firstName} ${maidenName} ${lastName}`);
        const age = active.map(item => item.age)
        const sum = active.reduce((accumulator, item) => accumulator + item.age, 0);
        for (let i = 0; i < active.length; i++) {


        console.log(`fullName : ${names[i]}\t\t\ ,Age: ${age[i]}`);
    }
    console.log("*****************");
    console.log("The total number of years old for men is :\t"+sum);
    } catch (error) {
        console.log('Error: ', error.message);
    }finally{
        console.log("*****************");
        summarizeAge()
    }
}

//processUserData();

async function summarizeAge() {
    const data = await fetchData()
    const sum = data.reduce((accumulator, item) => accumulator + item.age, 0);
    console.log("The total number of years old is :\t" + sum);
}
//summarizeAge();


processUserData()
