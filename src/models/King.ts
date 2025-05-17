import { Piece } from "./Piece.js";

export class King extends Piece {
  constructor(color: "white" | "black", row: number, col: number) {
    super(color, row, col, color === "white" ? "♔" : "♚");
  }

  clone(): King {
    return new King(this.color, this.row, this.col);
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(toRow - this.row);
    const colDiff = Math.abs(toCol - this.col);

    if (rowDiff <= 1 && colDiff <= 1) {
      const destination = board[toRow][toCol];
      return destination === null || destination.color !== this.color;
    }

    return false;
  }
}
