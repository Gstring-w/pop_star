var squareNum = 10; //小方块的数量
var allSquare = [];
var select = [];
var star_wrapper = document.getElementsByClassName("star_wrapper")[0];
var select_score = document.getElementsByClassName("select_score")[0];
var timer = null;
var score = 0;
var moveHash = {
  bottom: -375 / squareNum,
  left: -375 / squareNum
};

function removeSquare() {
  if (select.length == 1) {
    return;
  }

  for (var i = 0; i < select.length; i++) {
    allSquare[select[i].col][select[i].row] = null;
    star_wrapper.removeChild(select[i]);
  }
}

function dropSquare() {
  for (var i = 0; i < squareNum; i++) {
    var pointer = 0;
    for (var j = 0; j < squareNum; j++) {
      if (allSquare[j][i] != null) {
        if (j != pointer) {
          allSquare[pointer][i] = allSquare[j][i];
          allSquare[j][i].row = pointer;
          allSquare[j][i] = null;
        }
        pointer++;
      }
    }
  }
  for (var i = 0; i < allSquare[0].length; ) {
    if (allSquare[0][i] == null) {
      for (var j = 0; j < squareNum; j++) {
        allSquare[j].splice(i, 1);
      }
      continue;
    }
    i++;
  }
}

function isOver() {
  var temp = [];
  for (var i = 0; i < allSquare; i++) {
    for (var j = 0; j < allSquare[0].length; j++) {
      check(allSquare[i][j], temp);
      console.log(temp);
      if (temp.length > 1) {
        return true;
      }
    }
  }
  return false;
}
function clickSquare(dom) {
  removeSquare();
  dropSquare();
  refresh();
  if (isOver()) {
    alert("游戏结束！");
  }
}

function check(dom, select) {
  if (dom == null) {
    return;
  }
  select.push(dom);
  if (
    dom.col > 0 &&
    allSquare[dom.col - 1][dom.row] &&
    allSquare[dom.col - 1][dom.row].num == dom.num &&
    select.indexOf(allSquare[dom.col - 1][dom.row]) == -1
  ) {
    check(allSquare[dom.col - 1][dom.row], select);
  }
  if (
    dom.col < squareNum - 1 &&
    allSquare[dom.col + 1][dom.row] &&
    allSquare[dom.col + 1][dom.row].num == dom.num &&
    select.indexOf(allSquare[dom.col + 1][dom.row]) == -1
  ) {
    check(allSquare[dom.col + 1][dom.row], select);
  }
  if (
    dom.row < squareNum - 1 &&
    allSquare[dom.col][dom.row + 1] &&
    allSquare[dom.col][dom.row + 1].num == dom.num &&
    select.indexOf(allSquare[dom.col][dom.row + 1]) == -1
  ) {
    check(allSquare[dom.col][dom.row + 1], select);
  }
  if (
    dom.row > 0 &&
    allSquare[dom.col][dom.row - 1] &&
    allSquare[dom.col][dom.row - 1].num == dom.num &&
    select.indexOf(allSquare[dom.col][dom.row - 1]) == -1
  ) {
    check(allSquare[dom.col][dom.row - 1], select);
  }
}

function shaking(select) {
  if (select.length == 1) {
    return;
  }
  var temp = 0;
  timer = setInterval(function() {
    for (var i = 0; i < select.length; i++) {
      select[i].style.border = "2px solid #abcdef";
      select[i].style.transform = `scale( ${0.9 + 0.05 * Math.pow(-1, temp)})`;
    }
    temp++;
  }, 300);
}
function noShaking(select) {
  if (timer !== null) {
    clearInterval(timer);
  }
  select_score.style.transition = "none";
  select_score.style.opacity = 0;
  for (var i = 0; i < select.length; i++) {
    select[i].style.transform = "scale(0.95)";
    select[i].style.border = "none";
  }
}
function showScore(select) {
  if (select.length == 1) {
    return;
  }
  select_score.innerHTML = `${select.length}块 ${select.length * 10}分`;
  select_score.style.transition = `opacity 1s`;
  select_score.style.opacity = 1;
}

function selectSquare(dom) {
  noShaking(select);
  select = [];
  check(dom, select);
  showScore(select);
  shaking(select);
}

function square(num, col, row) {
  if (num == null) {
    return;
  }
  var dom = document.createElement("div");
  dom.style.display = "inline-block";
  dom.style.position = "absolute";
  dom.style.left = (375 / squareNum) * col + "px";
  dom.style.bottom = (375 / squareNum) * row + "px";
  dom.style.width = 375 / squareNum + "px";
  dom.style.height = 375 / squareNum + "px";
  dom.style.backgroundImage = "url('./static/img/" + num + ".png')";
  dom.style.backgroundSize = "cover";
  dom.style.transform = "scale(0.95)";
  dom.style.border = "1px solid #abcdef";
  dom.style.boxSizing = "border-box";
  dom.style.borderRadius = "12px";
  dom.num = num;
  dom.col = col;
  dom.row = row;
  return dom;
}
function refresh() {
  for (var i = 0; i < allSquare.length; i++) {
    for (var j = 0; j < allSquare[i].length; j++) {
      if (allSquare[i][j] == null) {
        continue;
      }
      allSquare[i][j].col = i;
      allSquare[i][j].row = j;
      allSquare[i][j].style.transition = "left 0.3s, bottom 0.3s";
      allSquare[i][j].style.left = allSquare[i][j].row * (375 / 10) + "px";
      allSquare[i][j].style.bottom = allSquare[i][j].col * (375 / 10) + "px";
      allSquare[i][j].style.backgroundImage =
        "url('./static/img/" + allSquare[i][j].num + ".png')";
      allSquare[i][j].style.backgroundSize = "cover";
      allSquare[i][j].style.transform = "scale(0.95)";
    }
  }
}
function initSquare() {
  //初始化一个二维数组
  for (var i = 0; i < squareNum; i++) {
    allSquare[i] = new Array();

    for (var j = 0; j < squareNum; j++) {
      allSquare[i][j] = square(Math.floor(Math.random() * 5), i, j);

      allSquare[i][j].onmouseover = function() {
        selectSquare(this);
      };
      allSquare[i][j].onclick = function() {
        clickSquare(this);
      };
      star_wrapper.append(allSquare[i][j]);

      refresh(allSquare);
    }
  }
}

window.onload = function() {
  init();
};

function init() {
  //初始化方块
  initSquare();
}
