import {
  createRandomNumber,
  checkValidNumber,
  compareAnswersAndGetResult 
} from '/src/lib/gameFunctions.js';

import { 
  correctAnswerMessage, 
  getWrongAnswerMessage 
} from '/src/lib/messages.js';

import { printCorrectAnswerForTest } from '/src/lib/test.js';

const gameTurn = document.getElementById('app');
const userInput = gameTurn.querySelector('#user-input');
const userInputButton = gameTurn.querySelector('#submit');
const resultElement = gameTurn.querySelector('#result')

export default class BaseballGame {
  constructor() {
    this.answer = createRandomNumber();
    this.isFinished = false;
    this.result = null;
    this.records = [];
  }

  _showRecords() {
    const showRecordsButton = resultElement.querySelector('#show-records-button');
    const showRecordsSection = document.createElement("div");
    const tryCount = document.createElement("p");
    const showRecordsList = document.createElement("ul");

    const getUserRecordText = ({
      userInputNumbers, 
      ball, 
      strike
    }) => `your answer: ${userInputNumbers}, result message: ` + getWrongAnswerMessage({ball, strike});
    
    showRecordsSection.id = "show-records";
    tryCount.id = 'try-count';
    showRecordsList.id = 'show-records-list';


    tryCount.innerText = `시도 횟수: ${this.records.length}`;
    this.records.forEach((record, idx) => {
      const _userRecord = document.createElement("li");      
      _userRecord.innerText = `${idx+1}차 시도➡ ` + (idx < this.records.length-1 ? getUserRecordText(record) : '정답!!');
      showRecordsList.appendChild(_userRecord);
    })

    showRecordsSection.appendChild(tryCount);
    showRecordsSection.appendChild(showRecordsList);
    resultElement.appendChild(showRecordsSection);
    resultElement.removeChild(showRecordsButton);
  }

  _askShowRecords() {
    const getHrElement = document.createElement('hr');
    const showRecordsButton = document.createElement('button');

    if(!this.result || !this.result.ok) return;

    showRecordsButton.id = "show-records-button";
    showRecordsButton.innerText = "show records";

    showRecordsButton.addEventListener('click', () => this._showRecords());

    resultElement.appendChild(getHrElement);
    resultElement.appendChild(showRecordsButton);
  }

  _askRestart() {
    const restartButton = document.createElement('button');
    const askRestartPlaceholder = document.createElement('p');

    if(!this.result || !this.result.ok) return;
    
    restartButton.id = "restart-button";
    askRestartPlaceholder.id = "ask-restart-placeholder";

    askRestartPlaceholder.innerText = "게임을 새로 시작하시겠습니까? ";
    restartButton.innerText = "restart";

    restartButton.addEventListener('click', () => window.location.reload());

    resultElement.appendChild(askRestartPlaceholder);
    resultElement.appendChild(restartButton);
  }

  _resetResultMessage() {
    const resultElementChildren = resultElement.childNodes;
    resultElementChildren.forEach(resultElementChild => resultElement.removeChild(resultElementChild));
  }

  _printResult(result) {
    const resultMessageElement = result.ok ? document.createElement('strong') : document.createElement('p');
    const message = result.ok ? correctAnswerMessage : getWrongAnswerMessage(result);
    
    this._resetResultMessage();

    this.isFinished = result.ok;
    resultMessageElement.innerText = message;
    resultElement.appendChild(resultMessageElement);

    if (this.result.ok) {
      this._askRestart();
      this._askShowRecords();
    }
    else userInput.value = '';
  }

  play(computerInputNumbers, userInputNumbers) {
    const _result = compareAnswersAndGetResult(computerInputNumbers, userInputNumbers);
    const { strike, ball } = _result;
    this.result = _result;
    this.records.push({ 
      userInputNumbers, 
      strike, 
      ball 
    });
    return this._printResult(_result);
  }
}

const startGame = () => {
  let _baseballGame = new BaseballGame();
  const runGame = e => {
    e.preventDefault();
    const checkUserInput = checkValidNumber(userInput.value);
    userInput.focus();
    if(_baseballGame.isFinished) return alert('이미 정답을 맞히셨습니다!');
  
    checkUserInput.ok ? _baseballGame.play(_baseballGame.answer, userInput.value) : alert(checkUserInput.msg);
  }

  printCorrectAnswerForTest(_baseballGame.answer);

  userInputButton.addEventListener('click', runGame);
  userInput.addEventListener('keydown', e => {
    if(e.key === 'Enter') return _baseballGame.isFinished ? window.location.reload() : runGame(e);
  });
}

startGame();