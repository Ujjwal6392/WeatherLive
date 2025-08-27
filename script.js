async function getData() {
  const input = document.querySelector("#cityInput").value;

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3c4cb7476cd8ae7b5270189289a3b0df&units=metric`
  );
  let data = await response.json();

  updateScreen(data, input);
}
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
function getLocaldatetime(dt, tz) {
  const nowUTC = Date.now();
  const localTime = new Date(nowUTC + tz * 1000);
  return {
    date: localTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
function getWeatherimg(type) {
  const imageat = document.querySelector("img");
  if (type === "Clouds") {
    imageat.setAttribute("src", "./appassets/images/clouds.png");
  } else if (type === "Drizzle") {
    imageat.setAttribute("src", "./appassets/images/drizzle.png");
  } else if (type === "Mist") {
    imageat.setAttribute("src", "./appassets/images/mist.png");
  } else if (type === "Rain") {
    imageat.setAttribute("src", "./appassets/images/rain.png");
  } else if (type === "Snow") {
    imageat.setAttribute("src", "./appassets/images/snow.png");
  } else if (type === "Clear") {
    imageat.setAttribute("src", "./appassets/images/clear.png");
  }
}
function updatecolor() {
  const icons = document.querySelectorAll("i");

  document.querySelector("body").classList.add("black-background");
  document.querySelector(".todays-weather").classList.add("card-color");
  document.querySelector("h1").style.color = "#ffffff";
  document.querySelector("h2").style.color = "#ffffff";
  document.querySelector("h3").style.color = "#ffffff";
  icons.forEach((icon) => {
    icon.style.color = "#dcdcdc";
    document.querySelector("#date").style.color = "#ffffff";
    document.querySelector("#humidity").style.color = "#e0e0e0";
    document.querySelector("#wind").style.color = "#e0e0e0";
    document.querySelector("#visibility").style.color = "#e0e0e0";
    document.querySelector("#air-pressure").style.color = "#e0e0e0";
    document.querySelector("#search-button").classList.add("button-change");
  });
}

function updateScreen(dat, input) {
  const cityName = capitalizeWords(input);
  const datTim = getLocaldatetime(dat.dt, dat.timezone);

  document.querySelector(
    "#city-name"
  ).innerHTML = `<i class="fa-solid fa-location-dot"></i> ${cityName}`;
  document.querySelector("#cityInput").value = "";
  updatecolor();

  if (dat.cod === "404") {
    document.querySelector("#date").textContent = "Please enter any valid city";
    document.querySelector("img").setAttribute("src", "");
    document.querySelector("#temperature").textContent = "☹️";
    document.querySelector("#humidity").textContent = "No humidity";
    document.querySelector("#wind").textContent = "No wind";
    document.querySelector("#visibility").textContent = "No visibility";
    document.querySelector("#air-pressure").textContent = "No air-pressure";
  } else {
    getWeatherimg(dat.weather[0].main);

    document.querySelector("#temperature").textContent =
      Math.round(dat.main.temp) + " °C";
    document.querySelector("#date").textContent = datTim.date;
    document.querySelector("#humidity").textContent = dat.main.humidity + " %";
    document.querySelector("#wind").textContent =
      (dat.wind.speed * 3.6).toFixed(1) + " km/h";
    document.querySelector("#visibility").textContent =
      (dat.visibility / 1000).toFixed(1) + " km";
    document.querySelector("#air-pressure").textContent =
      dat.main.pressure + " mb";
  }
}

document.querySelector("#search-button").addEventListener("click", getData);
