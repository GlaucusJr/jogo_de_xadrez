import { Piece, Color } from "./Piece.js";

export class Pawn extends Piece {
  constructor(color: Color, row: number, col: number) {
    super(color, row, col, color === "white" ? "♙" : "♟");
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const dir = this.color === "white" ? -1 : 1;
    const startRow = this.color === "white" ? 6 : 1;

    // Avanço de uma casa
    if (toCol === this.col && toRow === this.row + dir && !board[toRow][toCol]) {
      return true;
    }

    // Avanço de duas casas no primeiro movimento
    if (toCol === this.col && toRow === this.row + 2 * dir && this.row === startRow && !board[this.row + dir][toCol] && !board[toRow][toCol]) {
      return true;
    }

    // Captura na diagonal
    if (Math.abs(toCol - this.col) === 1 && toRow === this.row + dir && board[toRow][toCol]?.color !== this.color) {
      return true;
    }

    return false;
  }
}
