import { Piece } from "./Piece.js";
import { Rook } from "./Rook.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { Pawn } from "./Pawn.js";
import { Color } from "./Piece.js";

export class Board {
  board: (Piece | null)[][] = [];
  selectedPiece: Piece | null = null;
  currentTurn: "white" | "black" = "white";

  constructor() {
    this.createEmptyBoard();
    this.addPieces();
  }

  createEmptyBoard() {
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
  }

  addPieces() {
    this.board[7][0] = new Rook("white", 7, 0);
    this.board[7][1] = new Knight("white", 7, 1);
    this.board[7][2] = new Bishop("white", 7, 2);
    this.board[7][3] = new Queen("white", 7, 3);
    this.board[7][4] = new King("white", 7, 4);
    this.board[7][5] = new Bishop("white", 7, 5);
    this.board[7][6] = new Knight("white", 7, 6);
    this.board[7][7] = new Rook("white", 7, 7);
    for (let col = 0; col < 8; col++) {
      this.board[6][col] = new Pawn("white", 6, col);
    }

    this.board[0][0] = new Rook("black", 0, 0);
    this.board[0][1] = new Knight("black", 0, 1);
    this.board[0][2] = new Bishop("black", 0, 2);
    this.board[0][3] = new Queen("black", 0, 3);
    this.board[0][4] = new King("black", 0, 4);
    this.board[0][5] = new Bishop("black", 0, 5);
    this.board[0][6] = new Knight("black", 0, 6);
    this.board[0][7] = new Rook("black", 0, 7);
    for (let col = 0; col < 8; col++) {
      this.board[1][col] = new Pawn("black", 1, col);
    }
  }

  render(container: HTMLElement) {
    container.innerHTML = "";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.className = "square " + ((row + col) % 2 === 0 ? "light" : "dark");
        square.dataset.row = row.toString();
        square.dataset.col = col.toString();

        const piece = this.board[row][col];
        if (piece) {
          square.textContent = piece.symbol;
        }

        if (this.selectedPiece) {
          if (piece === this.selectedPiece) {
            square.classList.add("selected");
          }

          if (this.selectedPiece.isValidMove(row, col, this.board)) {
            square.classList.add("highlight");
          }
        }

        square.addEventListener("click", () => {
          const row = parseInt(square.dataset.row!);
          const col = parseInt(square.dataset.col!);
          this.handleSquareClick(row, col);
        });

        container.appendChild(square);
      }
    }
  }

  handleSquareClick(row: number, col: number) {
    const clickedPiece = this.board[row][col];

    if (this.selectedPiece) {
      if (this.selectedPiece.isValidMove(row, col, this.board)) {
        if (clickedPiece && clickedPiece.color !== this.selectedPiece.color) {
          this.board[row][col] = null;
        }

        this.board[this.selectedPiece.row][this.selectedPiece.col] = null;
        this.board[row][col] = this.selectedPiece;
        this.selectedPiece.move(row, col);

        this.selectedPiece = null;
      } else {
        this.selectedPiece = null;
      }

      this.render(document.getElementById("board")!);
    } else if (clickedPiece) {
      this.selectedPiece = clickedPiece;
      this.render(document.getElementById("board")!);
    }
  }
}
