var youWin = false;
var number = 10;
var downPower = 1;
var autoDown = 0;
function numberGoesDown() {
  numbers -= downPower;
  updateNumbers();
}
function numberGoesDowner() {
  downPower++;
  if (downPower > 25) downPower = 25;
  updateNumbers();
}
function numberGoesDownAuto() {
  autoDown++;
  if (autoDown > 25) autoDown = 25;
  updateNumbers();
}
function updateNumbers() {
  document.getElementById("number").innerText = number.toFixed();
}
var lastFrame = 0;
function nextFrame(timeStamp) {
  let dt = timeStamp - lastFrame;
  lastFrame = timeStamp;
  numbers[0] -= autoDown*dt/1000;
  if (downPower > 1) {
    downPower -= dt/1000;
  } else downPower = 1;
  if (autoDown > 0) {
    autoDown -= dt/10000;
  } else autoDown = 0;
  updateNumbers();
  window.requestAnimationFrame(nextFrame);
}
window.requestAnimationFrame(nextFrame);
