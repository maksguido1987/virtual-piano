const piano = document.querySelector('.piano');
let flag;

piano.addEventListener('mousedown', playNoteOnMouseDown);
document.addEventListener('keydown', playNoteOnKeyDown);
document.addEventListener('mouseup', (event) => {
  event.target.classList.remove('piano-key-active');
  event.target.classList.remove('piano-key-active-pseudo');
  flag = false;
});

function playNoteOnMouseDown(event) {
  flag = true;
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.letter;
    const audio = document.querySelector(`audio[data-letter="${note}"]`);
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
    playAudio(audio);
  }
  if (flag === true) {
    piano.addEventListener('mouseover', function (event) {
      const note = event.target.dataset.letter;
      const audio = document.querySelector(`audio[data-letter="${note}"]`);
      if (audio) {
        playAudio(audio);
      }
    });
    piano.addEventListener('mouseout', function (event) {
      if (flag === true) {
        event.target.classList.remove('piano-key-active');
        event.target.classList.remove('piano-key-active-pseudo');
        event.relatedTarget.classList.add('piano-key-active');
        event.relatedTarget.classList.add('piano-key-active-pseudo');
      }
    });
  }
}

function playNoteOnKeyDown(event) {
  flag = true;
  if (event.repeat) return;
  let key = event.code[3];
  const audio = document.querySelector(`audio[data-letter="${key}"]`);
  const keyActive = document.querySelector(`div[data-letter="${key}"]`);
  if (keyActive && event.code.length <= 4) {
    keyActive.classList.add('piano-key-active');
    keyActive.classList.add('piano-key-active-pseudo');
    playAudio(audio);
    document.addEventListener('keyup', function () {
      keyActive.classList.remove('piano-key-active');
      keyActive.classList.remove('piano-key-active-pseudo');
    });
  }
  flag = false;
}

function playAudio(path) {
  if (flag === true) {
    path.currentTime = 0;
    path.play();
  }
}

// FULLSCREEN

const openFullscreen = document.querySelector('.openfullscreen');

openFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
});

// BUTTONS

const pianoKeys = document.querySelectorAll('.piano-key');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

btnNotes.addEventListener('click', () => {
  btnNotes.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');
  pianoKeys.forEach((key) => key.classList.remove('piano-key-letter'));
});

btnLetters.addEventListener('click', () => {
  btnNotes.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');
  pianoKeys.forEach((key) => key.classList.add('piano-key-letter'));
});
