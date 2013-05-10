//  ~5% of code code in view.js (converting x/y coordinates to row/col) inspired by:
//  https://www.youtube.com/watch?v=fqzaxdiRZS4

"use strict";


if(exports === undefined || exports === null) {
  var exports = {};
}

exports.View = function() {
  var mouse = {};

  var CellImageDimensions = {
    width: 30,
    height: 30
  };

  var STATE = {
    EXPOSED: 0,
    FLAGGED: 1
  };

  var minesweeper = new exports.Minesweeper();
  var score = 0;
  minesweeper.placeNumMines(10);
  var canvas2d;

  var boxImage = new Image();
  var numImage = new Image();
  var zeroImage = new Image();
  var bombImage = new Image();
  var flagImage = new Image();

  boxImage.src = "img/box.png";
  numImage.src = "img/num.png";
  zeroImage.src = "img/zero.png";
  bombImage.src = "img/mine.png";
  flagImage.src = "img/flag.png";

  window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = 400;
    canvas.height = 400;

    canvas2d = canvas.getContext("2d");


  };


  window.onclick = function(e, rightClick) {

    mouse.x = e.pageX;
    mouse.y = e.pageY;
    var row;
    var col;

    var inBounds = Math.floor(mouse.x / CellImageDimensions.width) < minesweeper.SIZE && Math.floor(mouse.y / CellImageDimensions.height) < minesweeper.SIZE && mouse.x >= 0 && mouse.y >= 0;
    if(inBounds) {
      row = Math.floor(mouse.x / CellImageDimensions.width);
      col = Math.floor(mouse.y / CellImageDimensions.height);

      if(!rightClick) {
        minesweeper.exposeCell(row, col);
        if(minesweeper.findNumAdjacentMines(row, col) === 0) {
          minesweeper.exposeAdjacentUnminedCells(row, col);
        }
        score = minesweeper.isGameOver() ? score : minesweeper.getScore();
      } else {
        minesweeper.toggleFlagCell(row, col);
      }
    }
  };

  window.oncontextmenu = function(e) {
    window.onclick(e, true);
    return false;
  };

  function drawCanvas() {
    var boardState = minesweeper.getBoardState();
    var mined = minesweeper.getMinedPositions();
    canvas2d.clearRect(0, 0, 400, 400);
    canvas2d.fillStyle = "black";
    canvas2d.font = "bold 20px Helvetica Neue";

    for(var i = 0; i < minesweeper.SIZE; i++) {
      for(var j = 0; j < minesweeper.SIZE; j++) {
        canvas2d.clearRect(0, 330, 400, 280);
        var xCoord = j * CellImageDimensions.width;
        var yCoord = i * CellImageDimensions.height;

        if(boardState[j][i] === "") {
          canvas2d.drawImage(boxImage, xCoord, yCoord);
        }

        if(boardState[j][i] === STATE.EXPOSED) {
          if(mined[j][i]) {
            canvas2d.drawImage(bombImage, xCoord, yCoord);
          } else {
            if(minesweeper.findNumAdjacentMines(j, i) === 0) {
              canvas2d.drawImage(zeroImage, xCoord, yCoord);
            } else {
              canvas2d.drawImage(numImage, xCoord, yCoord);

              canvas2d.fillText(minesweeper.findNumAdjacentMines(j, i), j * CellImageDimensions.width + 10, i * CellImageDimensions.height + 21);
            }
          }
        } else if(boardState[j][i] === STATE.FLAGGED) {
          canvas2d.drawImage(flagImage, xCoord, yCoord);
        } else {
          canvas2d.drawImage(boxImage, xCoord, yCoord);
        }

        if(minesweeper.isGameOver()) {
          boardState[j][i] = STATE.EXPOSED;
          canvas2d.fillText("YOU LOSE", 10, 350);
        }

        if(minesweeper.isGameWon()) {
          canvas2d.fillText("YOU WIN", 10, 350);
        }


        canvas2d.fillText("Score: " + score, 220, 350);


      }
    }
  }

  setInterval(drawCanvas, 20);
};

var view = new exports.View();
