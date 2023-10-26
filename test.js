var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);
map.locate({setView: true, maxZoom: 20});
function onLocationFound(e) {
    var radius = e.accuracy*2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Create a marker at the user's location
        L.marker([latitude, longitude]).addTo(map);

        // Use reverse geocoding to get the city based on the coordinates
        fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var city = data.address.city;
                // Display the city on your page
                document.getElementById('city').innerHTML = 'You are in ' + city;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'d9c5f087a7ee7aea88d9c5d9e1f9a9f6'}&units=metric`;
                async function getWeather() {
                    try {
                        const response = await fetch(apiUrl);
                        const data = await response.json();
        
                        if (data.cod === 200) {
                            const weatherInfo = `
                                <p>Temperature: ${data.main.temp}°C</p>
                                <p>Weather: ${data.weather[0].description}</p>`;
        
                            document.getElementById('weather-info').innerHTML = weatherInfo;
                        } else {
                            document.getElementById('weather-info').innerHTML = 'Error fetching weather data.';
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        document.getElementById('weather-info').innerHTML = 'An error occurred while fetching weather data.';
                    }
                }
        
                getWeather();
            })
            .catch(function (error) {
                console.error('Error fetching city: ' + error);
            });
    });
} else {
    console.log('Geolocation is not available in this browser.');
}
