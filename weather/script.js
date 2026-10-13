const apiKey = "20cd9e58047afc083839e02ad1baeaac";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  try {
    const response = await fetch(
      `${apiUrl}${city}&appid=${apiKey}`
    );

    const data = await response.json();

    if (data.cod != 200) {
      alert(data.message);
      return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      data.wind.speed + " km/h";

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
}

// Test
checkWeather("Mumbai");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});