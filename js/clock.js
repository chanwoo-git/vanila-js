// index.html 페이지의 현재 시간을 나타내는 부분이다.
// 실시간을 가져오기 때문에 사용자의 컴퓨터 시간에 따라 달라진다.

// html 파일의 class와 tag를 "querySelector"메소드를 이용하여 가져온다.
// 데이터를 가져올때는 하나의 객채 형태로 가져오며 
// 데이터의 모양은 "<tag>text or content</tag>" 모양을 가진다.
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

// Date 객체를 생성하여 컴퓨터의 시간을 가져온다.
// 이때 date 객체의 값은 'Date 객채가 생성된 시간값'을 가진다.
// date 객체의 각각의 프로퍼티 값인 시, 분, 초를 각각의 변수에 저장하고,
// "querySelector"메소드로 가져온 "clockTitle(h1 tag of HTML)"객체의 내용으로 삽입한다.
// 내용을 삽입할 때는 리터럴 탬플릿을 사용하며 해당 객체의 ".innerText"의 값을 할당해 주었다.
function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// 페이지의 각 기능들을 최초로 실행하여 초기화 시키는 함수임.
// "setInterval"내장함수를 이용하여 1000밀리초(1초)의 지연시간을 가지고 내부의 파라미터로 주어진 함수가 실행된다.
function init() {
  setInterval(getTime, 1000);
}

// 페이지의 최초 로드시 각 getTime 함수를 한 번 실행시켜서 페이지의 시간이 00:00:00으로 표시되지 않도록 한다.
getTime();
init();