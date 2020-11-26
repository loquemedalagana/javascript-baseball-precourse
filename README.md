# README by Seongwon Kim
- origin https://github.com/woowacourse/javascript-baseball-precourse

## 구현해야 할 기능들
1. 1~9 사이의 서로 "다른" 난수 3개를 생성해서 3자리의 수 생성(0포함 X)
2. 클래스 모듈에서 생성된 난수 불러오기
3. [입력] 사용자가 3자리 숫자 입력하는 기능,
- 잘못된 입력 예시 => 해당 경우일 경우 alert message 출력 후 다시 입력하게 하기
  - 3자리 숫자가 아니거나 문자가 들어간 경우
  - 각 자리의 수가 같은 숫자일 경우
  - 숫자 중에 0이 입력된 경우
  - 공백이 들어간 경우


- [출력] 이미 form은 만들어져 있기 때문에 결과를 출력하자.
4. 정답을 맞히기 전까지는 게임을 종료시키지 않는다.
5. 정답 판정 기준 알고리즘 만든다.
- 유저 숫자 === 컴터 숫자 => 게임 공료
- 유저 숫자 !== 컴터 숫자 => 아래에 맞게 결과 출력 후 입력 반복
- 입력 반복 시 초기화 잊지 말 것
  - 같은 수가 같은 자리 -> 스트라이크 (스트라이크 체크 메소드 만들기)
  - 같은 수가 다른 자리 -> 볼 (볼 체크 메소드 만들기)
  - 같은 수가 하나도 없을 경우 -> 낫싱 (앞의 두 가지가 모두 아닐 경우)


6. 재시작 기능, 예전 데이터 초기화 (앞 부분 다 구현하고 할 것!)


## 개인적인 요구사항
1. 일단 함수형이 익숙하니 함수형으로 시도
2. 기본적으로 요구하는 사항부터 먼저 구현할 것 (indent 3 넘어가지 말기)
3. 기본 기능이 완료되면 1차 리팩토링 진행하기
4. 추가 기능들 생각해보기 ex) 성적표 출력, 몇 번만에 정답을 맞혔는지?, css 등

<br>
<hr/>

# 특이사항
- 파일 분할은 웹팩 설정이 필요하므로 우선 동작부터 시킨 후 한다.

## 로컬에서 cors에러로 고생 
- npm i http-server -g 설치 후 npx http-server -p 포트번호 로 실행해서 해결
- 참고 링크
https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu

- 다른 방법 => index.html 우클릭 후 open with live server 해보기

<hr/>

## 중간 보고 -> 기본 기능 구현 완료까지..
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
1. 결과물을 브라우저 화면에 출력하기
2. 재시작 기능 만들기
3. 리팩토링
4. 추가기능 구현

<hr/>