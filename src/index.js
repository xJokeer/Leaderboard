import './styles.css';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VL1o9DWssm2uCNVVrQsW/scores';
const myList = document.getElementById('listScr');

const scores = (list, listRes) => {
  const { result } = listRes;
  const scores = [];
  for (let i = 0; i < result.length; i += 1) {
    scores.push([result[i].user, result[i].score]);
  }
  list.innerHTML = '';
  scores.forEach((score) => {
    list.innerHTML += `<li>${score[0]}: ${score[1]}</li>`;
  });
};

const data = async () => {
  await fetch(API_URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => scores(myList, result));
};

const posData = async (user, score) => {
  // eslint-disable-next-line no-sequences
  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => json);
};

const sendData = async () => {
  const sendScore = document.querySelector('#btton');
  const inputName = document.querySelector('#name');
  const inputScore = document.querySelector('#score');
  console.log('hi im outside the event');
  sendScore.addEventListener('click', () => {
    posData(inputName.value, inputScore.value);
  });
};

const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', () => {
  data();
});

document.addEventListener('DOMContentLoaded', () => {
  data();
  sendData();
});
