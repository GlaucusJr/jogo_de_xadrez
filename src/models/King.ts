import { Piece, Color } from "./Piece.js";

export class King extends Piece {
  constructor(color: Color, row: number, col: number) {
    super(color, row, col, color === "white" ? "♔" : "♚");
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(toRow - this.row);
    const colDiff = Math.abs(toCol - this.col);

    if (rowDiff <= 1 && colDiff <= 1) {
      const target = board[toRow][toCol];
      return target === null || target.color !== this.color;
    }

    return false;
  }
}
