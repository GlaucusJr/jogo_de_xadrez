import { Piece } from "./Piece.js";
import { Pawn } from "./Pawn.js";

export class Board {
  grid: (Piece | null)[][] = [];

  constructor() {
    this.createEmptyBoard();
    this.setupPieces();
  }

  createEmptyBoard() {
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      for (let col = 0; col < 8; col++) {
        this.grid[row][col] = null;
      }
    }
  }

  setupPieces() {
    // Peões brancos na linha 6
    for (let col = 0; col < 8; col++) {
      this.grid[6][col] = new Pawn("white", 6, col);
      this.grid[1][col] = new Pawn("black", 1, col); // pretos na linha 1
    }
  }

  render(container: HTMLElement) {
    container.innerHTML = "";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.className = "square " + ((row + col) % 2 === 0 ? "white" : "black");

        const piece = this.grid[row][col];
        if (piece) {
          square.textContent = piece.symbol;
        }

        container.appendChild(square);
      }
    }
  }
}
