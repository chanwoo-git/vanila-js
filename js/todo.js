// 사용자가 페이지에 to do 리스트를 입력하면 화면에 출력하고 
// 브라우저가 그것을 기억하고 있는다.
// 그리고 사용자가 삭제할 경우 브라우저에서 완전히 삭제되며 
// 새로고침을 하더라도 다시 출력되지 않는다.

// 필요한 HTML 데이터를 가져와서 저장한다.
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

// 고유한 값으로 사용될 변수를 선언.
// Local Storage의 key 값으로 사용할 TODOS_LS 를 선언.
const TODOS_LS = 'toDos';

// 사용자가 입력한 to do 값을 기억할 리스트 변수를 선언.
const toDos = [];

// 사용자가 입력한 to do list 의 값을 삭제하는 함수.
// 사용자가 "X" 버튼을 클릭하면 이 함수가 실행된다.
// 먼저 사용자가 클릭을 하면 event 객체의 target 프로퍼티를 btn 변수에 저장한다.
// event.target은 이벤트가 직접적으로 발생한 부분의 데이터(객체)를 가져온다.
// console.dir() 메소드를 사용하여 console.log() 로 안보이는 자식 객체들을 확인할 수 있다. 
// btn 객체의 자식 객체인 parentNode 객체를 li 변수에 저장하여 어떤 li 태그에서 발생한 이벤트인지를 추적한다.
// HTML 파일의 li 태그를 삭제하여 화면에 출력되지 않도록 한다.
// toDos 리스트의 값을 filter()메소드를 이용하여 파라미터의 값과 특정한 조건(!==)을 이용하여 비교를 한다. true 값을 반환하는 리스트의 값만이 cleanToDos 의 값으로 사용되고 false를 반환하는 값들은 버려진다.
// splice() 메소드를 이용하여 toDos 리스트의 값을 초기화 시킨다.
// for 제어문을 이용하여 toDos 리스트에 cleanToDos 리스트의 값을 대입한다.
// 마지막으로 saveToDos() 함수를 호출하여 브라우저에 변경된 값을 업데이트 한다.
function removeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== li.id;
  });
  toDos.splice(0);
  for (let i = 0; i < cleanToDos.length; i++) {
    toDos[i] = cleanToDos[i];
  }
  saveToDos();
}

// 브라우저의 local Storage에 기억할 값을 저장하는 함수.
// localStorage.setItem() 메소드는 기본적으로 데이터를 일반 텍스트 형식으로 저장하기 때문에 JSON.stringify() 메소드를 이용하여 JSON 파일 헝태로 포멧시킨다.
// key: TODOS_LS, value: JSON.stringify(toDos)
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 사용자가 input 태그에 submit 이벤트를 발생시키면 value 값을 받아서 브라우저에 저장하고, 화면에 출력시키는 함수.
// 문서(document)에 createElement() 메소드를 사용하여 새로운 요소를 생성한다.
// 사용자가 입력한 값에 고유한 이름을 붙일 newId 값을 생성한다(이 값은 toDos의 길이값을 참조한다).
// 삭제버튼 역할을 하는 delBtn에 "X" 텍스트를 삽입하고 새로운 이벤트 리스너를 등록한다.
// 삭제버튼에 "click" 이벤트가 발생하면 removeToDo 함수가 실행된다.
// 사용자가 입력한 값을 담을 span 태그에 입력한 값을 삽입한다.
// li 태그에 자식 요소로 span 요소와 delBtn 요소를 추가한다.
// 브라우저에 저장할 값을 객체 형태로 생성하여 toDos 리스트에 추가한다.
// push() 메소드는 인자를 리스트의 가장 마지막에 추가한다.
// 마지막으로 saveToDos() 함수를 호출하여 브라우저에 값을 저장한다. 
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", removeToDo)
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = `list${newId}`;
  toDoList.appendChild(li);
  const toDoOj = {
    text: text,
    id: `list${newId}`
  }
  toDos.push(toDoOj);
  saveToDos();
}

// to do 항목을 입력하는 input 태그를 감싸고 있는 form 태그의 기능을 제한한다.
// event.preventDefault() 메소드를 이용하면 기존 기능을 제한할 수 있다.
// input 태그에 입력된 value 값을 currentValue 변수에 저장한다.
// 저장한 값을 paintToDo() 함수에 인자로 제공하여 화면에 표시되도록 한다.
// form 의 기존기능을 제한했기 때문에 submit을 하더라도 input 태그의 내용이 초기화되지 않기 때문에 수동으로 초기화 하려고 input.valeu 값을 "" 빈 문자열로 값을 수동으로 할당한다.
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// 브라우저가 to do 값을 가지고 있는지 확인하고, 가지고 있다면 데이터를 가져와서 JSON 파일 포멧으로 변경하여 parsedToDos 변수에 저장한다.
// JSON 파일 형태로 변환하면 데이터가 객체 형태로 저장된다.
// forEach 메소드를 이용하여 객체가 가지고 있는 값을 하나씩 불러와서 함수 내부의 코드를 실행한다(이 코드에서 객체가 가지고 있는 값들은 또다른 객체이다).
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text)
    })
  }
}

// 페이지 초기 로드 시 한 번 초기화를 시켜주는 함수이며, 
// 실행될 때 to do 를 감싸고 있는 form 태그에 새로운 이벤트 리스너를 등록시킨다.
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();