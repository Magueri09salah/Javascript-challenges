var fs = require('fs');


const randomCity = new Promise((resolve,reject) => {
  fs.readFile('input.txt', 'utf8' ,function(err, data) {

if (err) {
  reject(err);
}
else
              resolve(data.trim()); })

});

async function fetchdataTemperature(city){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();

     return data;
 }

 function displayWeather(city,temperature){
    return `City name : ${city.name} ; Temperature ${temperature}`;

}


 async function main() {
    try {
      // Select a random city
      const selectedCityName  = await randomCity;
      console.log('Selected city:', selectedCityName );

      const cities = [
        { name: 'New York', lat: 40.7128, lng: -74.0060 },
        { name: 'London', lat: 51.5074, lng: -0.1278 },
        { name: 'Paris', lat: 48.8566, lng: 2.3522 },
        { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
        { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
        { name: 'Rome', lat: 41.9028, lng: 12.4964 },
        { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
        { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
        { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
        { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
      ];

      const selectedCity = cities.find(city => city.name === selectedCityName);
        if (selectedCity){
          // Fetch temperature data for the selected city
          const weatherData = await  fetchdataTemperature(selectedCity);
          // Extract temperature value from the retrieved data
          const temperature = weatherData.current_weather.temperature;
          // Display city name and temperature to the user
          displayWeather(selectedCity, temperature);
        }
        else{
          console.error('error');
        }





    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // main()

module.exports = {main , displayWeather, fetchdataTemperature, randomCity}
