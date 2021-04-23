// 페이지의 배경화면을 랜덤으로 선택하여 사용자의 화면에 출력하는 기능.
// 페이지에 접속할 때 마다 배경화면이 바뀜.
// 시간이 지남에 따라 자동으로 변하는 기능은 없음.

// 필요한 HTML 데이터를 가져옴.
const body = document.querySelector('body');

// 현재 이 페이지가 가지고 있는 사진의 갯수.
// 고유한 값을 가지는 코드임.
// 하지만 사진의 갯수에 따라 값이 유동적으로 변할 수 있었으면 함.
// 확장성이 부족함.
const IMG_NUMBER = 5;

// 화면에 배경사진을 출력하는 코드.
// 새로운 이미지 객체를 image 변수에 생성.
// 새로운 image 객체의 src(source) 프로퍼티를 상대경로와 랜덤한 파일이름을 이용하여 지정함.
// image 객체에 새로운 클래스를 추가함.
// document의 body 태그에 image 객체를 추가하여 화면에 표시되도록 한다.
function paintImage(imgNumber) {
  const image = new Image()
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage")
  body.appendChild(image);
}

// 0 부터 사진의 갯수만큼의 숫자 범위 중 랜덤한 숫자 1개룰 뽑는 함수.
// Mate.floor() 메소드는 인자로 받는 모든 소수점자리 숫자를 버린 정숫값을 반환한다.
// Mate.random() 메소드는 0 에서 1 사이의 랜덤한 값을 반환한다.
// 추출된 값을 함수를 호출한 부분에 반환한다.
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

// 페이지의 기능을 최초 초기화 하는 함수.
function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();