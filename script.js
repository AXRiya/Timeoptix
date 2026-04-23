const apiKey = 'a9ce613f9f3b08a7460fab2389fa1bea';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function checkWeather(city) {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        // Update Text
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
        document.getElementById('humidity').innerText = data.main.humidity + "%";
        document.getElementById('wind').innerText = data.wind.speed + " m/s";
        document.getElementById('weatherDesc').innerText = data.weather[0].description;

        // Update Weather Icon
        const iconCode = data.weather[0].icon;
        const iconImg = document.getElementById('weatherIcon');
        iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconImg.style.display = "block";

        // Dynamic Backgrounds based on condition
        const condition = data.weather[0].main;
        if (condition === "Clouds") {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1534088568595-a066f710521e?q=80&w=1000')";
        } else if (condition === "Clear") {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1000')";
        } else if (condition === "Rain") {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1000')";
        } else {
            document.body.style.background = "#0f172a"; // Default dark
        }

        // Format Sunrise/Sunset
        const formatTime = (time) => new Date(time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('sunrise').innerText = formatTime(data.sys.sunrise);
        document.getElementById('sunset').innerText = formatTime(data.sys.sunset);

    } catch (error) {
        console.log("Error:", error);
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => checkWeather(cityInput.value));

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(cityInput.value);
    }
});

// Load default city
checkWeather('Lucknow');

const hours = new Date().getHours();
let greeting = "";

if (hours < 12) greeting = "Hola! Good Morning!";
else if (hours < 18) greeting = "Annyeong! Good Afternoon!";
else greeting = "Good Evening!";

document.getElementById('cityName').innerHTML = `<span>${greeting}</span><br>${data.name}`;