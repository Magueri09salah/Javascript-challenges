
const fs = require ('fs');
// const fetch = require ('fetch')

async function readCityName(){
    try {
        const cityName = await fs.readFile('input.txt','utf8');
        return cityName;
    }catch(error) {
        throw new Error('Failed to read city name from input file');
    }
}

async function main(){
    const cityName = await readCityName();
    console.log('Selected city:', cityName);
}

main()
