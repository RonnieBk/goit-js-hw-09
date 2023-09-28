const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

buttonStop.setAttribute('disabled', '');

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    const bodyColor = getRandomHexColor();
    document.body.style.backgroundColor = bodyColor;
  }, 1000);

  buttonStop.removeAttribute('disabled');
  buttonStart.setAttribute('disabled', '');
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStop.setAttribute('disabled', '');
  buttonStart.removeAttribute('disabled');
});
