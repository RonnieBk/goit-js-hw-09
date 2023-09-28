import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerWrapper = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', '');
btnStart.addEventListener('click', runCountDown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

function onClose(selectedDates) {
  if (selectedDates[0].getTime() - new Date().getTime() <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future', {
      position: 'center-top',
    });
  } else {
    btnStart.removeAttribute('disabled');
  }
}

function runCountDown() {
  btnStart.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');
  const timeInFuture = new Date(inputDate.value);
  const timerId = setInterval(() => {
    const countDown = timeInFuture.getTime() - new Date().getTime();
    if (countDown >= 0) {
      const timeLeft = convertMs(countDown);
      days.textContent = addLeadingZero(timeLeft.days);
      hours.textContent = addLeadingZero(timeLeft.hours);
      minutes.textContent = addLeadingZero(timeLeft.minutes);
      seconds.textContent = addLeadingZero(timeLeft.seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr('#datetime-picker', options);

// Styles
timerWrapper.style.display = 'flex';
timerWrapper.style.gap = '13px';
timerWrapper.style.marginTop = '15px';

fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});
values.forEach(value => {
  value.style.fontSize = '35px';
  value.style.lineHeight = '1.2';
});
labels.forEach(label => {
  label.style.textTransform = 'uppercase';
  label.style.fontSize = '10px';
  label.style.fontWeight = 'bold';
});
