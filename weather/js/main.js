"user strict"
const key = `853abe904d374deebe184939213009`;
const cities = Intl.DateTimeFormat().resolvedOptions().timeZone;
const text = cities;
const myArray = text.split("/");
let city = myArray[1];

let locationCityItem = document.getElementById('location');
let tempItem = document.getElementById('temp')



function getDate() {
  let todayItem = document.getElementById('day')
  let todaydate = document.getElementById('date')
  let nextItem = document.getElementById('next')
  let afterItem = document.getElementById('afternext')
  let thirdDayIem= document.getElementById('thirdDay')
  let day = new Date();
  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let todayweek = weekday[day.getDay()];
  let curentMonth = months[day.getMonth()]

  let tomorrow = new Date(day.getTime() + 24 * 60 * 60 * 1000);
let twoDays = new Date(day.getTime() + 2 * 24 * 60 * 60 * 1000);
  let threeDays  = new Date(day.getTime() + 3 * 24 * 60 * 60 * 1000);


   nextItem.innerHTML=   weekday[tomorrow.getDay()];
   afterItem.innerHTML=  weekday[twoDays.getDay()];
   thirdDayIem.innerHTML= weekday[threeDays.getDay()]


  let daydate = day.getDate();

  todayItem.innerHTML = todayweek
  todaydate.innerHTML = daydate + " " + curentMonth
  // nextItem.innerHTML = nextDay
 
  // afterItem.innerHTML = DayTwo
}
getDate()



async function curentWeather(city) {
  let weather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
  let data = await weather.json()
  cityName = data.location.name
  temp_c = data.current.temp_c
  locationCityItem.innerHTML = cityName
  tempItem.innerHTML = temp_c

}
curentWeather(city)



async function next3Days(city) {
  let tempItem1 = document.getElementById('tempone')
  let tempItem2 = document.getElementById('temptwo')
  let tempItem3= document.getElementById('tempThree')

  let nextDays = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`)
  let data = await nextDays.json();
  let dayOne = data.forecast.forecastday[0].day.avgtemp_c
  let daytwo = data.forecast.forecastday[1].day.avgtemp_c
  let daythree =data.forecast.forecastday[2].day.avgtemp_c

  tempItem1.innerHTML= dayOne
  tempItem2.innerHTML= daytwo
  tempItem3.innerHTML = daythree
}

next3Days(city)


async function searchCity(trim) {

  const findBtn = document.querySelector('#find');
  const searchInput= document.getElementById('search')
  

 searchInput.addEventListener('keydown', function(){

    city = searchInput.value
    if(city.length > 3){
      curentWeather(city)
      next3Days(city)

    }

   

console.log(city)

 })

  let weather = await fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${trim}`)

  let data = await weather.json()
  console.log(data)

}
searchCity('cairo')


