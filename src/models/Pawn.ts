import { Piece, Color } from "./Piece.js";

export class Pawn extends Piece {
  symbol = this.color === "white" ? "♙" : "♟";
  hasMovedTwoStepsLastTurn = false;

  constructor(color: Color, row: number, col: number) {
    super(color, row, col, color === "white" ? "♙" : "♟");
  }

  isValidMove(row: number, col: number, board: (Piece | null)[][]): boolean {
    const direction = this.color === "white" ? -1 : 1;
    const startRow = this.color === "white" ? 6 : 1;
    const target = board[row][col];

    // Movimento para frente
    if (col === this.col) {
      if (row === this.row + direction && !target) return true;
      if (this.row === startRow && row === this.row + 2 * direction && !target && !board[this.row + direction][col]) {
        return true;
      }
    }

    // Captura normal
    if (Math.abs(col - this.col) === 1 && row === this.row + direction) {
      if (target && target.color !== this.color) return true;

      // En Passant
      const adjacent = board[this.row][col];
      if (
        adjacent instanceof Pawn &&
        adjacent.color !== this.color &&
        adjacent.hasMovedTwoStepsLastTurn
      ) {
        return true;
      }
    }

    return false;
  }

  move(row: number, col: number): void {
    if (Math.abs(row - this.row) === 2) {
      this.hasMovedTwoStepsLastTurn = true;
    } else {
      this.hasMovedTwoStepsLastTurn = false;
    }
    super.move(row, col);
  }

  clone(): Pawn {
    const clone = new Pawn(this.color, this.row, this.col);
    clone.hasMovedTwoStepsLastTurn = this.hasMovedTwoStepsLastTurn;
    return clone;
  }
}
