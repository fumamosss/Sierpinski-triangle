const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pointSize = 5;
let iterations = 500;
let distanceFactor = 0.5;

let points = [];
let currentPoint = [0, 0];

ctx.fillStyle = "rgb(255, 255, 255)";

function SetPoint(e) {
  let rect = canvas.getBoundingClientRect();
  let mousePos = [e.clientX - rect.left, e.clientY - rect.top];

  ctx.fillRect(mousePos[0], mousePos[1], 5, 5);
  points.push(mousePos);
  currentPoint = mousePos;
}

function Draw() {
  if (points.length < 3) {
    alert("Need more points");
    return;
  }

  for (let i = 0; i < iterations; i++) {
    let randomNumber = Math.floor(Math.random() * points.length);
    console.log(randomNumber);
    DrawNextPoint(points[randomNumber]);
  }

  function DrawNextPoint(fromPoint) {
    let a = fromPoint;
    let b = currentPoint;
    let ab = [b[0] - a[0], b[1] - a[1]];
    let c = [a[0] + ab[0] * distanceFactor, a[1] + ab[1] * distanceFactor];

    ctx.fillRect(c[0], c[1], pointSize, pointSize);
    currentPoint = c;
  }
}

function Clear() {
  points = [];
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawBoard();
}

let bw = canvas.clientWidth;
let bh = canvas.clientHeight;

function drawBoard() {
  for (let x = 0; x <= bw; x += 50) {
    ctx.moveTo(0.5 + x, 0);
    ctx.lineTo(0.5 + x, bh);
  }

  for (let x = 0; x <= bh; x += 50) {
    ctx.moveTo(0, 0.5 + x);
    ctx.lineTo(bw, 0.5 + x);
  }
  ctx.strokeStyle = "#292928";
  ctx.stroke();
}

drawBoard();
