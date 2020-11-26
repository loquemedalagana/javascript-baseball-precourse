const checkValidNumber = inputs => {
  if(/[^1-9]+/g.test(inputs)) return {ok: false, msg: '1-9의 각 다른 숫자 3개를 공백 없이 입력하세요'};
  if(inputs.length !== 3) return {ok: false, msg: '숫자는 3개만 입력가능합니다.'};
  
  if(inputs.charAt(0) === inputs.charAt(1) || inputs.charAt(0) === inputs.charAt(2) || inputs.charAt(1) === inputs.charAt(2)) return {ok: false, msg: '같은 숫자는 여러번 올 수 없습니다.'};
  
  return {ok: true, msg: '올바른 입력입니다!'};
}

const createRandomNumber = () => {
  let randomNum = String(Math.floor(Math.random()*999 + 1));
  while(true) {
    if(checkValidNumber(randomNum).ok) break;
    randomNum = String(Math.floor(Math.random()*999 + 1));
  }
  return randomNum;
}

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    return "결과 값 String";
  };

  const startGame = () => {
    const answer = createRandomNumber();
    console.log('hello world!', answer);
    
  }

  startGame();
}

new BaseballGame();
