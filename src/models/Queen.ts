import { Piece } from "./Piece.js";

export class Queen extends Piece {
  constructor(color: "white" | "black", row: number, col: number) {
    super(color, row, col, color === "white" ? "♕" : "♛");
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = toRow - this.row;
    const colDiff = toCol - this.col;

    if (rowDiff === 0 || colDiff === 0) {
      const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
      const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;

      let currentRow = this.row + rowStep;
      let currentCol = this.col + colStep;

      while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol] !== null) {
          return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
      }

      const destination = board[toRow][toCol];
      return destination === null || destination.color !== this.color;
    }

    if (Math.abs(rowDiff) === Math.abs(colDiff)) {
      const rowStep = rowDiff > 0 ? 1 : -1;
      const colStep = colDiff > 0 ? 1 : -1;

      let currentRow = this.row + rowStep;
      let currentCol = this.col + colStep;

      while (currentRow !== toRow && currentCol !== toCol) {
        if (board[currentRow][currentCol] !== null) {
          return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
      }

      const destination = board[toRow][toCol];
      return destination === null || destination.color !== this.color;
    }

    return false;
  }
}