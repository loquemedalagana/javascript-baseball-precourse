# README by Seongwon Kim
- origin https://github.com/woowacourse/javascript-baseball-precourse

## File Directory
- index.js => 메인 함수
- /src/lib
<ul>
  <li>gameFunctions.js -> 게임 실행 관련 함수들 정리(랜덤넘버 생성, 입력 검사, 게임 로직)</li>
  <li>messages.js -> 정답 메시지, 오답 힌트 메시지 출력</li>
  <li>test.js -> 테스트 코드(정답 콘솔창에만 출력)</li>
</ul>

## 구현해야 할 기능들
1. 1~9 사이의 서로 "다른" 난수 3개를 생성해서 3자리의 수 생성(0포함 X) 
  - /lib/gameFunctions.js 내 createRandomNumber() 메소드
  - checkValidNumber(inputs)는 컴퓨터 수, 유저인풋 유효성 검사 같이함

2. 클래스 모듈에서 생성된 난수 불러오기
  - 메인 클래스 내 constructor(생성자) 에서 만듦

3. 게임 시작 메소드
  - 객체지향의 특성을 활용해서 main함수인 startGame()내부에 다음과 같이 새로운 객체 형태로 선언
``` javascript
let _baseballGame = new BaseballGame();
```
  - 객체가 생성될 때 컴퓨터 정답 난수, 게임 종료 여부, 결과 기록 메소드 초기화
``` javascript
  constructor() {
    this.answer = createRandomNumber();
    this.isFinished = false;
    this.result = null;
    this.records = [];
  }
```


4. 사용자가 3자리 숫자 입력하는 기능,
  - 잘못된 입력 예시 => 해당 경우일 경우 alert message 출력 후 다시 입력하게 하기
    - 3자리 숫자가 아니거나 문자가 들어간 경우
    - 각 자리의 수가 같은 숫자일 경우
    - 숫자 중에 0이 입력된 경우
    - 공백이 들어간 경우
  - index.js 내 startGame()안의 addEventListener에서 처리함
  - 컴퓨터가 생성한 난수랑 동일한 메소드에서 유효성 검사 처리
  - change 이벤트 리스너는 필요 없어서 버튼에만 등록함


5. 정답을 맞히기 전까지는 게임을 종료시키지 않는다.
  - 객체의 멤버 변수인 isFinished에서 처리, 종료되었으면 버튼 누를 때 경고메시지 띄움

6. 정답 판정 기준 알고리즘 만든다.
  - 유저 숫자 === 컴터 숫자 => 게임 공료
  - 유저 숫자 !== 컴터 숫자 => 아래에 맞게 결과 출력 후 입력 반복
  - 입력 반복 시 초기화 잊지 말 것
    - 같은 수가 같은 자리 -> 스트라이크 (스트라이크 체크 메소드 만들기)
    - 같은 수가 다른 자리 -> 볼 (볼 체크 메소드 만들기)
    - 같은 수가 하나도 없을 경우 -> 낫싱 (앞의 두 가지가 모두 아닐 경우)
  - 해당 기능은 /lib/gameFunctions.js에 compareAnswersAndGetResult(컴퓨터, 사람)으로 구현
    - 객체 형태로 정답 여부와 스트라이크/볼 횟수 리턴

7. DOM 조작해서 결과 출력하는 기능
  - /src/messages.js 에 메시지들을 저장 
    - 본인은 해외유저랑 같이 사용하는 프로젝트 중이므로 메시지를 습관적으로 모듈화함
  - index.js에 baseballGame 클래스에 멤버 함수로 DOM 조작 함수 생성
    - play함수에서는 결과를 호출 후 객체에 결과 기록 함수에 저장함
    - _printResult(result) 함수에서 DOM조작 후 결과 출력
      - 정답일 시 재시작 여부 물음
      - 오답일 시 user input 초기화


8. 재시작 기능, 예전 데이터 초기화 
  - 클래스 내 _resetResultMessage() 멤버 함수에서 이전 결과 메시지 삭제 처리(정, 오답 공통)
  - _askRestart() 함수에서 재시작 여부 물어보고 재시작 할 경우 새로고침 처리

9. 추가 기능
  - 생성자에 이전 결과들을 저장하는 배열들 생성
  - 게임이 진행될 때마다 시도 횟수와 이전 입력값들, 힌트 메시지들 저장하는 배열 생성자에 선언
  - 게임이 끝난 후 재시작 묻는 부분 아래에 결과 보기 버튼 생성, 누르면 버튼이 사라지고 결과 출력
    - 결과 출력 묻는 메소드는 _askShowRecords()에 저장됨
    - 출력하면서 DOM 조작하는 메소드는 _showRecords()

<hr/>

## 결과 화면

<br/>

![baseball_result](./captures/result1.png)
![baseball_result_with_additional_func](./captures/result2.png)


<br/>
<hr/>

## 개인적인 요구사항
1. 일단 함수형이 익숙하니 함수형으로 시도
2. 기본적으로 요구하는 사항부터 먼저 구현할 것 (indent 3 넘어가지 말기)
3. 기본 기능이 완료되면 1차 리팩토링 진행하기
4. 추가 기능들 생각해보기 ex) 정답 시도 횟수

<br>
<hr/>

# 특이사항
- 파일 분할은 웹팩 설정이 필요하므로 우선 동작부터 시킨 후 한다.

## 로컬에서 cors에러로 고생 
- npm i http-server -g 설치 후 npx http-server -p 포트번호 로 실행해서 해결
- 참고 링크
https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu

- 다른 방법 => index.html 우클릭 후 open with live server 해보기(기존에 live server extension 설치됨)

<hr/>

# 개발 일지

## Day 1 -> 기본 기능 구현 완료까지..
### 개발 과정
1. 처음에 습관적으로 파일 분할을 했다가 문제가 생겨서 로직이 복잡해짐
- 해결 방법 : 우선 하나의 파일에 병합 후 기능부터 동작하게 한다. 구동 안되면 끝.

2. 인덴트 요구사항은 최대한 지키면서 기능 하나둘씩 동작하게 함
- 랜덤넘버 생성, 유저 이벤트 등록, 게임 진행, 결과 문구 출력 순으로 구현

3. 기능을 최대한 모듈별로 쪼갬. 그리고 중복 사용 가능한 함수(숫자 유효성 검사)는 공통으로 뺌

### 아쉬운 점
1. 나름 리액트를 수개월 간 썼지만, 단기간에 FE공부를 하는 바람에 구멍난 부분이 많음
- ex. DOM 동작 원리, webpack 기초, 클래스 문법, 이벤트 리스너

2. 프로젝트를 설계할 때 내 현재 능력에서 무리하는 선을 잘 정할 것.
- 구현 가능한 범위부터 해결하고 잘 동작할 때 추가적인 학습을 진행해서 업데이트 할 것

### 다음 구현할 사항
1. 결과물을 브라우저 화면에 출력하기 (완료)
2. 재시작 기능 만들기 (완료)
3. 리팩토링 (완료)
4. 추가기능 구현

<hr/>

## Day 2 -> DOM 복습하면서...
1. 게임 결과까지는 출력 됨.
- 정답 맞을 경우 바로 출력.
- 틀린 경우 밑에 새로운 메시지만 더해짐.
  - 해결 방법 ? DOM 트리 구조를 새로 짜자!
  - 알고보니 요구사항을 잘못 이해했었다...

2. 새로운 input form 더할 때?
- clone node method 사용
- 기존 이벤트 리스너 제거하고 새로운 노드에다가 추가해야하는데...
  - 지금 컨디션이 최악이라, 전체적으로 다시 리팩토링을 한 후 자연스럽게 추가하자.
  - 논리는 이제 알았으니까!!
  - DOM 트리를 새로 그리면서 할까?

3. 지나친 모듈화를 지양(디버깅을 위해...) + 생성자, 내부의 this 특성 활용하기


<hr/>

## Day 3 - 요구사항 구현 완료!
1. 원활한 DOM 조작을 위해 class형태로 리팩토링
2. 굳이 input form에 change event lister를 쓰지 않고, 
- react에서는 onchange로 이벤트를 걸면서 useState를 사용했었음

3. window.location.reload() 새로 고침 함수 복습
4. 정답이 나오면 새로고침, 틀리면 user input reset 후 다시 입력 후 이전 결과 지우고 새 결과 출력하게 만듦

## Day 4 - 파일 분할 완료
1. keydown type event listener를 추가 후 Enter키 눌렀을 때도 게임이 실행되게 만듦
2. 외부 파일 import 에러는 경로를 /src/lib/파일명.js로 바꾸니 해결됨, 원활히 리팩토링 가능해짐
3. 정답 시 이전 오답 기록 나오는 오류 수정
4. 추가 기능으로 시도 횟수와 이전 기록들 출력하는거 구현
5. 추가 기능 실행 시 불필요하게 여러번 출력되는걸 막기 위해 추가기능 실행 시 버튼 사라지게 함

<hr/>