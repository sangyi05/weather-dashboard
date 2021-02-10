var userFormEl = document.querySelector(".card-body")
var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#city-container");
var emptyArray = []

var getCityWeather = function(city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1bb2fcdac1987e229e0a7f65f71a5247"
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(response) {
            weatherToday = response.main
            //for weather icon
            //document.querySelector("#weather-icon").setAttribute('src', response.weather[0].icon)
            document.querySelector("#weather-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png") 
            document.querySelector("#feels-like").textContent = "Temperature: " + response.main.feels_like + "°F"
            document.querySelector("#humidity").textContent = "Humidity: " + response.main.humidity + "%"
            document.querySelector("#wind-speed").textContent = "Wind Speed: " + response.wind.speed
            displayWeather(weatherToday, city)
            
            var latitude = response.coord.lat
            var longitude = response.coord.lon
            
            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=1bb2fcdac1987e229e0a7f65f71a5247')
                .then(function(response) {
                    return response.json()
                })
                .then(function(response) {
                    // uvi and index
                    var uvEl = document.querySelector("#UV")
                    var uvi = response.current.uvi
                    uvEl.textContent = "UV Index: " + uvi

                    if (uvi <2) {
                        uvEl.classList.add("low");
                      } else  if (uvi <5) {
                        uvEl.classList.add("moderate")
                      } else if (uvi <7) {
                        uvEl.classList.add("high")
                      } else if (uvi < 10) {
                        uvEl.classList.add("veryhigh")
                      } else {
                        uvEl.classList.add("extreme")
                      }
                    

                    document.querySelector("#forecast-title").textContent = "5-Day Forecast: "
                    var unixTimestamp = [
                        response.daily[0].dt, 
                        response.daily[1].dt, 
                        response.daily[2].dt, 
                        response.daily[3].dt, 
                        response.daily[4].dt, 
                        response.daily[5].dt
                    ]

                    var date = []

                    for (var i=0; i < unixTimestamp.length; i++) {
                        var milliseconds = unixTimestamp[i] * 1000
                        var dateObject = new Date(milliseconds)
                        var formattedDateOne = dateObject.toLocaleString()
                        date.push(formattedDateOne)
                        console.log(date)
                    }
                    
                    document.querySelector("#date").textContent = date[0]
                    document.querySelector("#forecast-title").textContent = "5-Day Forecast: "
                    //forecast day 1
                    document.querySelector("#day-1-date").textContent = date[1]
                    document.querySelector("#day-1-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png")
                    document.querySelector("#day-1-temp").textContent = "Temp: " + response.daily[1].temp.day + "°F"
                    document.querySelector("#day-1-humidity").textContent = "Humidity: " + response.daily[1].humidity + "%"
                    
                    //forecast day 2
                    document.querySelector("#day-2-date").textContent = date[2]
                    document.querySelector("#day-2-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png")
                    document.querySelector("#day-2-temp").textContent = "Temp: " + response.daily[2].temp.day + "°F"
                    document.querySelector("#day-2-humidity").textContent = "Humidity: " + response.daily[2].humidity + "%"

                    //forecast day 3
                    document.querySelector("#day-3-date").textContent = date[3]
                    document.querySelector("#day-3-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png")
                    document.querySelector("#day-3-temp").textContent = "Temp: " + response.daily[3].temp.day + "°F"
                    document.querySelector("#day-3-humidity").textContent = "Humidity: " + response.daily[3].humidity + "%"

                    //forecast day 4
                    document.querySelector("#day-4-date").textContent = date[4]
                    document.querySelector("#day-4-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png")
                    document.querySelector("#day-4-temp").textContent = "Temp: " + response.daily[4].temp.day + "°F"
                    document.querySelector("#day-4-humidity").textContent = "Humidity: " + response.daily[4].humidity + "%"

                    //forecast day 5
                    document.querySelector("#day-5-date").textContent = date[5]
                    document.querySelector("#day-5-icon").setAttribute('src', "https://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + "@2x.png")
                    document.querySelector("#day-5-temp").textContent = "Temp: " + response.daily[5].temp.day + "°F"
                    document.querySelector("#day-5-humidity").textContent = "Humidity: " + response.daily[5].humidity + "%"
                })
        });
    });
};

// get user's city from the <input> element and send to function getUserRepos()
var formSubmitHandler = function(event) {
    event.preventDefault();

    var list = JSON.parse(localStorage.getItem('cityHistory')) || []   
    
    var searchCity = cityInputEl.value.trim()
    console.log(searchCity)
    if (searchCity) {
        getCityWeather(searchCity)
        cityInputEl.value = ""
        list.push(searchCity)
        localStorage.setItem('cityHistory', JSON.stringify(list))
    }

    for (var i = 0; i < list.length; i++) {
        var el = document.createElement("a")
        el.classList = "list-item flex-row justify-space-between"
        el.textContent = list[i]
        el.setAttribute("href", "./index.html")
        document.querySelector("#city-list").appendChild(el)

    }
}

var displayWeather = function(response, searchTerm) {

    var citySearchTerm = document.querySelector("#city-search-term");
    console.log(searchTerm)
    citySearchTerm.textContent = searchTerm
}

userFormEl.addEventListener("submit", formSubmitHandler)