// Local Storage 의 값을 보고 
// 저장된 유저의 이름이 있으면 그 이름을 이용하여 유저를 기억
// 저잗된 유저의 이름이 없으면 유저의 이름을 물어본다.

// HTML 파일에서 필요한 데이터를 가져옴.
// form, input 의 값은 유저의 이름을 물어보는 역할을 한다.
// greeting 의 값은 브라우저에 저장된 값을 이용하여 사용자를 기억하는 역할.
const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

// 고유한 값으로 사용될 변수를 선언.
// Local Storage 저장될 key 값을 가진 USER_LS
// CSS의 스타일을 조정할 class name 값을 가진 SHOWING_CN 이 있다.
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// localStorage 객체에 "setItme"메소드를 이용하여 key, value 파라미터를 주어 값을 브라우저 local Storage에 저장한다.
// key: USER_LS, value: text
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// form 태그가 가진 원래 기능(form 내부의 input 태그에 값을 넣고 submit을 했을 때 사용자의 위치를 어딘가로 이동시키려는 속성)을 event.preventDefault()메소드를 이용하여 제한시킨다.
// input태그에 입력된 값(value)을 변수에 저장.
// 그리고 각각의 함수에 인자로써 값을 전달.
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

// 만약 브라우저에 저장된 유저의 이름이 없는 경우 실행하는 함수.
// display 값이 none 으로 되어있음.
// form 태그에 classList 객체를 이용 add 함수를 이용하여 SHOWING_CN 값을 추가.
// classList 객체를 사용하면 대상 태그(또는 어떤 HTML 데이터)의 클래스값의 리스트를 가져온다.
// classList.add() 메소드는 클래스값의 리스트 마지막에 파라미터 값을 추가한다.
// 마지막으로 form 태그에 이벤트 리스너 함수를 추가해 놓는다.
// 이벤트 리스너 함수는 "submit" 이벤트가 일어났을 때 "handleSubmit" 함수를 실행시킨다.
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// 만약 브라우저에 저장된 유저의 이름이 있는 경우 실행하는 함수.
// 값이 존지하지 않을 때 form 태그에 추가된 SHOWING_CN 클래스 값을 지워서 사용자의 이름을 중복하여 물어보지 않도록 form 태그를 화면에 표시되지 않게 한다.
// classList.remove() 메소드를 사용하여 원하는 클래스의 값을 삭제할 수 있다.
// classList.add() 메소드를 사용하여 h4.greetings 태그에 SHOWING_CN 클래스의 값을 추가하여 화면에 나타나도록 한다.
// 리터럴 탬플릿을 이용하여 h4.greetings 태그의 content 값을 수정한다.
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
}

// localStorage 객체에 getItem() 메소드를 이용하여 유저의 이름을 브라우저에 물어본다(값이 존재하는지).
// Local Storage에 존재하지 않는 값을 가져오면 null 값을 반환한다.
// 이를 이용하여 null 값이 반환되는 경우 사용자의 이름을 물어보는 askForName()함수를 실행시킨다.
// null 값이 아닌 모든 경우 paintGreeting()함수를 실행시킨다.
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

// init 함수는 JavaScript 내장 함수가 아니며 프로그래머들 사이에서 관행적으로 사용하는 함수이다.
// 함수의 이름은 정해진 형태가 없지만 init 의 이름을 많이 사용한다.
// 페이지의 최초 로드 시 함수를 호출 및 실행을 함으로써 초기화를 시켜줌.
// 가독성 측면에서 사용하기도 함.
function init() {
  loadName();
}

init();