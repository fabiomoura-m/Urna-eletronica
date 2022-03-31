let yourVoteFor = document.querySelector('.division-1-header span');
let position = document.querySelector('.division-1-position span');
let candidateDescription = document.querySelector('.division-1-candidate');
let warning = document.querySelector('.display_division-2');
let candidateImages = document.querySelector('.division-1--right');
let numbers = document.querySelector('.division-1-numbers');

let currentStage = 0;
let number = '';

function startStage() {
  let stage = etapas[currentStage];

  let numberHtml = '';

  for (let i = 0; i < stage.numeros; i++) {
    if (i === 0) {
      numberHtml += "<div class='number blink'></div>";
    } else {
      numberHtml += "<div class='number'></div>";
    }
  }

  yourVoteFor.style.display = 'none';
  position.innerHTML = stage.titulo;
  candidateDescription.innerHTML = '';
  warning.style.display = 'none';
  candidateImages.innerHTML = '';
  numbers.innerHTML = numberHtml;
}

function updateInterface() {
  let stage = etapas[currentStage];
  // verifica o candidato
  let candidate = stage.candidatos.filter(item => {
    if (item.numero === number) {
      return true;
    } else {
      return false;
    }
  });
}

function clicked(n) {
  let elementNumber = document.querySelector('.number.blink');
  if (elementNumber !== null) {
    elementNumber.innerHTML = n;
    number += n;

    elementNumber.classList.remove('blink');
    if (elementNumber.nextElementSibling !== null) {
      elementNumber.nextElementSibling.classList.add('blink');
    } else {
      updateInterface();
    }
  }
}

function white() {
  alert('clicou em branco');
}

function fix() {
  alert('clicou em Corrige');
}

function confirm() {
  alert('clicou em confirma');
}

startStage();
