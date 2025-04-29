const API_KEY = "425aa462f9f839f287384602457e129f";

const getWeather = async () => {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        // Use "forecast" API instead of "weather"
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();

        // Extract next 6 timestamps
        const weatherData = data.list.slice(0, 6).map((entry) => ({
            time: new Date(entry.dt * 1000).toLocaleTimeString(),
            temp: (entry.main.temp - 273.15).toFixed(2), // Convert Kelvin to Celsius
        }));

        updateChart(weatherData);
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
};

const updateChart = (weatherData) => {
    const ctx = document.getElementById("weatherChart").getContext("2d");

    if (window.weatherChart instanceof Chart) {
        window.weatherChart.destroy(); // Destroy previous chart
    }

    window.weatherChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: weatherData.map((d) => d.time),
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: weatherData.map((d) => d.temp),
                    borderColor: "red",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
};
