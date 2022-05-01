const url = 'https://api.openweathermap.org/data/2.5/';
const key = '9fe83dc38e4b16f2d392fab3fb7d33f8';
const search = document.getElementById('search');

search.addEventListener('keypress', getInfo);

function getInfo(e){
    if(e.keyCode == '13'){
        showInfo(search.value)

        search.value = '';
    }
}

function showInfo(paramsCity){
    let linkWeather = `${url}weather?q=${paramsCity}&appid=${key}&units=metric&lang=en`;
    fetch(linkWeather)
        .then(weather => {
            return weather.json()
        })
        .then(data => {
            if(data.cod === 200){
                showResults(data)
            }else{
                alert('City not found (-_-)')
            }
        })
        .catch(e => console.log(e.message)) 
}
 function showResults(result){
    console.log(result);
    let city = document.getElementById('city');
    let teprature = document.getElementById('temprature');
    let description = document.getElementById('description');
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    let icon = document.getElementById('icon');
    let bgImage = document.getElementById('bgImage');
    description.innerHTML = `
        ${result.weather[0].description}
    `
    city.innerHTML = `${result.name}, ${result.sys.country}`;
    teprature.innerHTML = `${Math.round(result.main.temp)}°C`;
    min.innerHTML = `Min Temprature: ${Math.round(result.main.temp_min)}°c`;
    max.innerHTML = `Max Temprature: ${Math.round(result.main.temp_max)}°c`;
    if(result.weather[0].main === 'Clouds'){
        icon.className = `fas fa-cloud`;
        bgImage.src = './img/cloudy.jpg'
    }else if(result.weather[0].main === 'Clear'){
        icon.className = `fas fa-sun`;
        bgImage.src = './img/sunny.jpg'
    }else if(result.weather[0].main === 'Rain'){
        icon.className = `fas fa-cloud-showers-heavy`;
        bgImage.src = './img/rainy.jpg'
    }else if(result.weather[0].main === 'Snow'){
        icon.className = `far fa-snowflake`;
        bgImage.src = './img/snowy.jpg'
    }else if(result.weather[0].main === 'Wind'){
        icon.className = `fas fa-wind`;
        bgImage.src = './img/windy.jpg'
    }
 }