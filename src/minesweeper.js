"use strict";

if(exports === undefined || exports === null) {
  var exports = {};
}

exports.Minesweeper = function() {
  this.SIZE = 10;

  var STATE = {
    EXPOSED  : 0,
    FLAGGED  : 1
  };

  var boardState = new Array(this.SIZE);
  var mined = new Array(this.SIZE);
  for (var row = 0, col = 0; row < this.SIZE; ++row) {
    boardState[row] = new Array(this.SIZE);
    mined[row] = new Array(this.SIZE);
    for(col = 0; col < this.SIZE; ++col) {
      boardState[row][col] = "";
      mined[row][col] = false;
    }
  }

  this.isGameOver = function () {
    for (var i = 0; i < this.SIZE; i++) {
      for (var j = 0; j < this.SIZE; j++) {
        if(mined[i][j] && (boardState[i][j] === STATE.EXPOSED)) {
          return true;
        }
      }
    }
    return false;
  };

  this.isGameWon = function () {
    for (var i = 0; i < this.SIZE; i++) {
      for (var j = 0; j < this.SIZE; j++) {
        if((mined[i][j] && boardState[i][j] !== STATE.FLAGGED) || (!mined[i][j] && (boardState[i][j] !== STATE.EXPOSED))) {
          return false;
        }
      }
    }
    return true;
  };

  this.exposeCell = function (row, col) {
    if(boardState[row][col] !== STATE.FLAGGED && boardState[row][col] !== STATE.EXPOSED &&
        (row >= 0) && (col >= 0) && (row < this.SIZE) && (col < this.SIZE)) {
      boardState[row][col] = STATE.EXPOSED;
      return true;
    }
    return false;
  };

  this.exposeAdjacentUnminedCells = function (row, col) {
    for (var i = row - 1; i <= row+1; i++) {
      for (var j = col - 1; j <= col+1; j++) {
        if((i >= 0) && (j >= 0) && (i < this.SIZE) && (j < this.SIZE) && !mined[i][j] && this.exposeCell(i, j) &&
           (this.findNumAdjacentMines(i,j) === 0)) {
          this.exposeAdjacentUnminedCells(i, j);
        }
      }
    }
    return true;
  };

  this.findNumAdjacentMines = function (row, col) {
    var numMines = 0;
    for (var i = row - 1; i <= row+1; i++) {
      for (var j = col - 1; j <= col+1; j++) {
        if((i >= 0) && (j >= 0) && (i < this.SIZE) && (j < this.SIZE) && mined[i][j]) {
          ++numMines;
        }
      }
    }
    return numMines;
  };


  this.toggleFlagCell = function (row, col) {
    if((row >= 0) && (col >= 0) && (row < this.SIZE) &&(col < this.SIZE) && (boardState[row][col] !== STATE.EXPOSED)) {
      boardState[row][col] === "" ? boardState[row][col] = STATE.FLAGGED : boardState[row][col] = "";
      return true;
    }
    return false;
  };

  this.placeMine = function (row, col) {
    return mined[row][col] ? false : mined[row][col] = true;
  };

  this.placeNumMines = function (minesToPlace) {
    for(var numMines = 0; numMines < minesToPlace; numMines++) {
      var row = Math.floor(Math.random() * this.SIZE);
      var col = Math.floor(Math.random() * this.SIZE);
      if(!this.placeMine(row, col)) {
        numMines--;
      }
    }
    return numMines;
  };

  this.getScore = function () {
    var score = 0;
    for (var i = 0; i < this.SIZE; i++) {
      for (var j = 0; j < this.SIZE; j++) {
        if(!this.isGameOver() && (boardState[i][j] === STATE.EXPOSED)) {
          score++;
        }
      }
    }
    return score;
  };

  this.getBoardState = function () {
    return boardState;
  };

  this.getMinedPositions = function () {
    return mined;
  };
};
