const API_Key = "0067700871cbf561cafaad8074cdc569";
const searchName = document.getElementById("city");
const submitCity = document.getElementById("form");
const pName = document.getElementById("city-name");
const pCondition = document.getElementById("condition");
const pC = document.getElementById("city-C");
const images = document.querySelectorAll("img");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");
const mainIcon = document.getElementById("main-icon");
const card2 = document.getElementsByClassName("card2");
// card 2 image selector
const mon = document.getElementById("mon");
const tue = document.getElementById("tue");
const wed = document.getElementById("wed");
const thu = document.getElementById("thu");
const fri = document.getElementById("fri");

// card 2 temp selector
const monTemp = document.getElementById("mon-temp");
const tueTemp = document.getElementById("tue-temp");
const wedTemp = document.getElementById("wed-temp");
const thuTemp = document.getElementById("thu-temp");
const friTemp = document.getElementById("fri-temp");

submitCity.addEventListener("submit", () => {
  if (searchName.value !== "") {
    getCoord(searchName.value);
    searchName.value = "";
  }
});

async function getCoord(city) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&appid=" +
        API_Key,
      { mode: "cors" }
    );
    const cityCoord = await response.json();
    const lat = cityCoord[0].lat;
    const long = cityCoord[0].lon;

    pName.textContent = "Loading...";
    pName.textContent = cityCoord[0].name + " | " + cityCoord[0].country;

    getWeather(lat, long);
  } catch {
    pName.textContent = "City not found";
    pCondition.textContent = "Try again";
    tempMin.textContent = "";
    tempMax.textContent = "";
    mainIcon.classList.add("not-found");
    mainIcon.src = "img/sad.svg";
    pC.textContent = "";
    mainIcon.classList.remove("fetched");
    card2[0].classList.add("hidden");
  }
}
const getImage = function (data, nr) {
  const icn = data.daily[nr].weather[0].icon;
  return icn;
};

const getMinMax = function (data, nr) {
  const min = Math.round(data.daily[nr].temp.min) + "°";
  const max = Math.round(data.daily[nr].temp.max) + "°";
  return min + "/" + max;
};

async function getWeather(lat, long) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        long +
        "&exclude=minutely,hourly" +
        "&appid=" +
        API_Key +
        "&units=metric",
      { mode: "cors" }
    );
    const cityInfo = await response.json();
    console.log(cityInfo);
    //main card
    mainIcon.style.visibility = "visible";
    mainIcon.src = "img/" + getImage(cityInfo, 0) + ".svg";
    mainIcon.classList.remove("not-found");
    mainIcon.classList.add("fetched");

    pCondition.textContent = cityInfo.daily[0].weather[0].description;
    pC.textContent = Math.round(cityInfo.daily[0].temp.day) + "°";
    tempMin.textContent = Math.round(cityInfo.daily[0].temp.min) + "°";
    tempMax.textContent = Math.round(cityInfo.daily[0].temp.max) + "°";

    //the curent imput is valid so now on card2 will not have the class hidden
    card2[0].classList.remove("hidden");

    //set the forecast images
    mon.src = "img/" + getImage(cityInfo, 1) + ".svg";
    tue.src = "img/" + getImage(cityInfo, 2) + ".svg";
    wed.src = "img/" + getImage(cityInfo, 3) + ".svg";
    thu.src = "img/" + getImage(cityInfo, 4) + ".svg";
    fri.src = "img/" + getImage(cityInfo, 5) + ".svg";

    //set the forecast temp
    monTemp.textContent = getMinMax(cityInfo, 1);
    tueTemp.textContent = getMinMax(cityInfo, 2);
    wedTemp.textContent = getMinMax(cityInfo, 3);
    thuTemp.textContent = getMinMax(cityInfo, 4);
    friTemp.textContent = getMinMax(cityInfo, 5);
  } catch (error) {
    pName.textContent = "City not found";
    pCondition.textContent = "Try again";
  }
}

getCoord("turda");
