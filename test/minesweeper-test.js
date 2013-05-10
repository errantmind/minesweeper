var csrequire = require('covershot').require.bind(null, require);

var myLibrary = csrequire('../src-instrumented/minesweeper.js');

"use strict";

var buster = require("buster");
var minesweeperTestModule = require("../src-instrumented/minesweeper");

buster.testCase("Minesweeper Tests", {

  minesweeper : {},

  setUp: function () {
    this.minesweeper = new minesweeperTestModule.Minesweeper();
  },

  "Test: Buster Canary" : function () {
    buster.assert(true);
  },

  "Test: Create Board" : function () {
    buster.assert(!this.minesweeper.isGameOver());
  },

  "Test: Expose a cell" : function () {
    buster.assert(this.minesweeper.exposeCell(0, 0));
  },

  "Test: Expose an exposed cell" : function () {
    this.minesweeper.exposeCell(0, 0);
    buster.assert(!this.minesweeper.exposeCell(0, 0));
  },

  "Test: Expose a flagged cell" : function () {
    this.minesweeper.toggleFlagCell(0, 0);
    buster.assert(!this.minesweeper.exposeCell(0, 0));
  },

  "Test: Expose a cell outside the board" : function () {
    buster.assert(!this.minesweeper.exposeCell(0, -1));
  },

  "Test: Expose all cells on a board with no mines" : function () {
    this.minesweeper.exposeAdjacentUnminedCells(0, 0);
    for(var row = 0; row < this.minesweeper.SIZE; ++row) {
      for(var col = 0; col < this.minesweeper.SIZE; ++col) {
        buster.assert(!this.minesweeper.exposeCell(row, col));
      }
    }
  },

  "Test: Expose all cells on a board with one mine" : function () {
    this.minesweeper.placeMine(0, 0);
    this.minesweeper.exposeCell(0, 1);
    this.minesweeper.exposeAdjacentUnminedCells(0, 1);
    buster.assert(!this.minesweeper.isGameOver());
  },

  "Test: Cell has no adjacent mines" : function () {
    buster.assert.equals(0, this.minesweeper.findNumAdjacentMines(0, 0));
  },

  "Test: Cell has one adjacent mine" : function () {
    this.minesweeper.placeMine(0, 1);
    buster.assert.equals(1, this.minesweeper.findNumAdjacentMines(0, 0));
  },

  "Test: Cell has two adjacent mines" : function () {
    this.minesweeper.placeMine(0, 1);
    this.minesweeper.placeMine(1, 0);
    buster.assert.equals(2, this.minesweeper.findNumAdjacentMines(0, 0));
  },

  "Test: Cell has three adjacent mines" : function () {
    this.minesweeper.placeMine(0, 1);
    this.minesweeper.placeMine(1, 0);
    this.minesweeper.placeMine(1, 1);
    buster.assert.equals(3, this.minesweeper.findNumAdjacentMines(0, 0));
  },

  "Test: Game over on expose a mine" : function () {
    this.minesweeper.placeMine(0, 0);
    this.minesweeper.exposeCell(0, 0);
    buster.assert(this.minesweeper.isGameOver());
  },

  "Test: Flag a cell" : function () {
    buster.assert(this.minesweeper.toggleFlagCell(0, 0));
  },

  "Test: UnFlag a cell" : function () {
    this.minesweeper.toggleFlagCell(0, 0);
    buster.assert(this.minesweeper.toggleFlagCell(0, 0));
  },

  "Test: Flag an exposed cell" : function () {
    this.minesweeper.exposeCell(0, 0);
    buster.assert(!this.minesweeper.toggleFlagCell(0, 0));
  },

  "Test: Flag placed outside board" : function () {
    buster.assert(!this.minesweeper.toggleFlagCell(-1, 0));
  },

  "Test: Place 0 mines using placeNumMines(...)" : function () {
    buster.assert.equals(this.minesweeper.placeNumMines(0), 0);
  },

  "Test: Place 10 mines using placeNumMines(...)" : function () {
    buster.assert.equals(this.minesweeper.placeNumMines(10), 10);
  },

  "Test: Is game won on board with no mines and all cells exposed" : function () {
    this.minesweeper.exposeAdjacentUnminedCells(0,0);
    buster.assert(this.minesweeper.isGameWon());
  },

  "Test: Is game won on board with no mines and no cells exposed" : function () {
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won on board with one mine and no cells exposed" : function () {
    this.minesweeper.placeMine(1, 1);
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won with single unflagged mined cell and all other cells exposed" : function () {
    this.minesweeper.placeMine(0, 0);
    this.minesweeper.exposeAdjacentUnminedCells(0,1);
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won with single flagged mined cell and all other cells exposed" : function () {
    this.minesweeper.placeMine(0, 0);
    this.minesweeper.toggleFlagCell(0, 0);
    this.minesweeper.exposeAdjacentUnminedCells(0,1);
    buster.assert(this.minesweeper.isGameWon());
  },

  "Test: Is game won with no cells exposed and all cells flagged and no mines" : function () {
    for(var row = 0; row < this.minesweeper.SIZE; ++row) {
      for(var col = 0; col < this.minesweeper.SIZE; ++col) {
        this.minesweeper.toggleFlagCell(row, col);
      }
    }
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won with no cells exposed and all cells flagged and some mines" : function () {
    this.minesweeper.placeMine(0,0);
    this.minesweeper.placeMine(1,1);
    for(var row = 0; row < this.minesweeper.SIZE; ++row) {
      for(var col = 0; col < this.minesweeper.SIZE; ++col) {
        this.minesweeper.toggleFlagCell(row, col);
      }
    }
    buster.assert(!this.minesweeper.isGameWon());
  },


  "Test: Is game won with one flagged mined cell and one unflagged mined cell, with all other cells exposed" : function () {
    this.minesweeper.placeMine(0, 0);
    this.minesweeper.placeMine(0, 1);
    this.minesweeper.toggleFlagCell(0, 0);
    this.minesweeper.exposeAdjacentUnminedCells(1,1);
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won on board with one unmined-flagged cell and no other cells exposed" : function () {
    this.minesweeper.toggleFlagCell(0,0);
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is game won on board with one unmined-flagged cell  and all other cells exposed" : function () {
    this.minesweeper.toggleFlagCell(0,0);
    this.minesweeper.exposeAdjacentUnminedCells(0,1);
    buster.assert(!this.minesweeper.isGameWon());
  },

  "Test: Is the score correct" : function () {
    this.minesweeper.exposeCell(0,0);
    this.minesweeper.exposeCell(1,0);
    this.minesweeper.exposeCell(1,1);
    this.minesweeper.placeMine(0,1);

    buster.assert.equals(3, this.minesweeper.getScore());
  }

});
