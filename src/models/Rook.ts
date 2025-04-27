import { Piece } from "./Piece.js";

export class Rook extends Piece {
  constructor(color: "white" | "black", row: number, col: number) {
    super(color, row, col, color === "white" ? "♖" : "♜");
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    if (this.row !== toRow && this.col !== toCol) {
      return false;
    }

    const rowStep = toRow > this.row ? 1 : (toRow < this.row ? -1 : 0);
    const colStep = toCol > this.col ? 1 : (toCol < this.col ? -1 : 0);

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
}
