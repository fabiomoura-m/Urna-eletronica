let yourVoteFor = document.querySelector('.division-1-header span');
let position = document.querySelector('.division-1-position span');
let candidateDescription = document.querySelector('.division-1-candidate');
let warning = document.querySelector('.display_division-2');
let candidateImages = document.querySelector('.division-1--right');
let numbers = document.querySelector('.division-1-numbers');

let currentStage = 0;
let number = '';
let voteWhite = false;
let votes = [];

function startStage() {
  let stage = etapas[currentStage];

  let numberHtml = '';
  number = '';
  voteWhite = false;

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
  numbers.style.display = 'flex';
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
  // preenche os dados do candidato
  if (candidate.length > 0) {
    candidate = candidate[0];
    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    candidateDescription.innerHTML = `
    Nome: ${candidate.nome} <br>
    Partido: ${candidate.partido}
    `;

    let photoHtml = '';
    for (let i in candidate.fotos) {
      if (candidate.fotos[i].small) {
        photoHtml += `<div class="division-1-image small"><img src="assets/images/${candidate.fotos[i].url}" alt="">${candidate.fotos[i].legenda}</div>`;
      } else {
        photoHtml += `<div class="division-1-image"><img src="assets/images/${candidate.fotos[i].url}" alt="">${candidate.fotos[i].legenda}</div>`;
      }
    }
    candidateImages.innerHTML = photoHtml;
  } else {
    // voto nulo
    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    candidateDescription.innerHTML =
      '<div>NÚMERO ERRADO</div><div class="big-warning blink">VOTO NULO</div>';
  }
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
  if (number === '') {
    voteWhite = true;
    yourVoteFor.style.display = 'block';
    warning.style.display = 'block';
    numbers.style.display = 'none';
    candidateDescription.innerHTML =
      '<div class="big-warning blink">VOTO EM BRANCO</div>';
  } else {
    alert(
      'Para votar em BRANCO o campo deve estar vazio. Aperte CORRIGE para apagar o campo de voto.'
    );
  }
}

function fix() {
  startStage();
}

function confirm() {
  let stage = etapas[currentStage];

  let confirmedVote = false;

  let audio = new Audio('assets/media/fim.mp3');

  //verifica se o voto foi nulo ou branco para confirmar
  if (voteWhite === true) {
    confirmedVote = true;
    votes.push({
      stage: etapas[currentStage].titulo,
      vote: 'Branco'
    });
  } else if (number.length === stage.numeros) {
    confirmedVote = true;
    votes.push({
      stage: etapas[currentStage].titulo,
      vote: number
    });
  } else {
    alert(
      'Para CONFIRMAR é necessário digitar o número do candidato ou votar em BRANCO'
    );
  }

  // caso voto confirmado, passa para o próximo candidato
  if (confirmedVote) {
    currentStage++;
    if (etapas[currentStage] !== undefined) {
      startStage();
    } else {
      document.querySelector('.display').innerHTML =
        '<div class="giant-warning">FIM</div>';
      console.log(votes);
      setTimeout(() => {
        window.location.reload();
      }, 10000);
      audio.play();
    }
  }
}

startStage();
