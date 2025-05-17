import { Piece, Color } from "./Piece.js";

export class Pawn extends Piece {
  constructor(color: Color, row: number, col: number) {
    super(color, row, col, color === "white" ? "♙" : "♟");
  }

  clone(): Pawn {
    return new Pawn(this.color, this.row, this.col);
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const dir = this.color === "white" ? -1 : 1;
    const startRow = this.color === "white" ? 6 : 1;
  
    if (toCol === this.col && toRow === this.row + dir && !board[toRow][toCol]) {
      return true;
    }
  
    if (toCol === this.col && toRow === this.row + 2 * dir && this.row === startRow && !board[this.row + dir][toCol] && !board[toRow][toCol]) {
      return true;
    }
  
    if (
      Math.abs(toCol - this.col) === 1 &&
      toRow === this.row + dir &&
      board[toRow][toCol] !== null &&
      board[toRow][toCol]!.color !== this.color
    ) {
      return true;
    }
  
    return false;
  }  
}
