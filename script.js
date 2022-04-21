const API_Key = "0067700871cbf561cafaad8074cdc569";
const searchName = document.getElementById('city');
const submitCity = document.getElementById('form');
const pName = document.getElementById("city-name");
const pCondition = document.getElementById("condition");
const pC = document.getElementById("city-C");
const images = document.querySelectorAll('img');
const tempMin = document.getElementById('temp-min');
const tempMax = document.getElementById('temp-max');

submitCity.addEventListener("submit",()=>{
  if(searchName.value!==""){
      getWeather(searchName.value);
      searchName.value = '';
  }
});

async function getWeather(city){
  try {
      pName.textContent = "Loading..."
      pCondition.textContent = '';
      pC.textContent = '';
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_Key+"&units=metric",{mode:'cors'});
      const cityInfo = await response.json();
      pName.textContent = cityInfo.name+" | "+cityInfo.sys.country;
      pCondition.textContent = cityInfo.weather[0].description;
      pC.textContent = cityInfo.main.temp + "°"; 
      tempMin.textContent = Math.round(cityInfo.main.temp_min) + "°";
      tempMax.textContent = Math.round(cityInfo.main.temp_max) + "°";
      console.log(cityInfo);
  } catch(error) {
      pName.textContent = "City not found";
      pCondition.textContent = "Try again"
  }
};