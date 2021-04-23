// 사용자의 위치정보와 날씨 정보를 나타내는 기능.

// 필요한 HTML 데이터를 가져온다.
const weather = document.querySelector(".js-weather");

// opneweathermap 페이지의 API 기능을 사용할 key 값이다.
const API_KEY = "f20159e8e32f886d390647fdcd559934";
// 사용자의 좌표값(위도, 경도)을 브라우저에 저장할 key 값이다.
const COORDS = "coords";

// 사용자의 위치 정보를 이용하여 날씨 정보를 가져오는 API 함수.
// fetch() 함수의 GET 호출 방식을 사용하여 URL 을 이용해 API를 받아오는 방법.
// API 데이터를 받아오는것이 성공하면 then() 메소드의 값으로 데이터를 넘겨준다.
// 데이터를 넘겨받은 then() 메소드는 JSON 포멧의 데이터를 JavaScript 객체 형태의 데이터로 바꾸어 돌려준다.
// JavaScript 객체 형태로 바뀐 데이터를 다음 then() 메소드가 받아서 객체의 각 프로퍼티 값을 받아서 리터럴 탬플릿을 이용하여 화면에 출력한다.
function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((res) => {
    return res.json();
  }).then((json) => {
    const temperatuer = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperatuer}℃ @ ${place}`;
  })
}

// 브라우저의 Local Storage 에 JSON 포멧으로 사용자의 좌표값(경도, 위도)을 저장하는 함수.
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

// 브라우저에 등록된 내장 객체인 position 을 이용하여 사용자의 좌표값(위도, 경도)을 찾아서 객체화 한 후 각 함수에 인자로 넘겨주는 함수.
// position 객체의 coords 객체의 값으로 latitude 와 longitude 값이 있다.
// 사용자가 위치정보를 받아오는 것을 허가했을 때 작동하는 함수이다.
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude)
}

// 사용자가 위치정보를 받아오는 것을 거부했을 때 작동하는 함수이다.
// 브라우저 콘솔에 "Cant access geo location" 문자열을 출력한다.
function handleGeoError() {
  console.log("Cant access geo location");
}

// 브라우저의 Local Storage 에 사용자의 좌표값(위도, 경도)가 저장되어 있지 않을 때 작동하는 함수.
// syntax: navigator.geolocation.getCurrentPosition(success, error, [option])
// 사용자의 위치를 받아오는 것이 성공했을 경우 handleGeoSuccess 함수가 실행된다.
// 사용자의 위치를 받아오는 것이 실패했을 경우 handleGeoError 함수가 실행된다.
// option 값은 생략 가능하므로 생략되었다. 
function askforCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

// 페이지 접속 시 가장 먼저 사용자의 위치정보가 브라우저에 저장되어있는지 판단하고 필요한 함수를 실행시키는 함수.
// 위치값이 저장되어 있지 않아 null 값이 반환되면 사용자에게 위치정보를 가져오는 것을 동의 받고 받아온다면 사용자의 위치와 그 위치에 해당하는 날씨정보를 화면에 출력.
// 이미 위치값이 저장되어 있다면 그 값을 이용하여 사용자의 위치와 해당 위치의 날씨 정보를 화면에 출력.
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askforCoords()
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

// 페이지 최초 로드시 초기화 함수.
function init() {
  loadCoords();
}

init();