import { Piece, Color } from "./Piece.js";

export class Rook extends Piece {
  constructor(color: Color, row: number, col: number) {
    super(color, row, col, color === "white" ? "♖" : "♜");
  }

  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    if (toRow !== this.row && toCol !== this.col) return false;

    const stepRow = toRow === this.row ? 0 : (toRow > this.row ? 1 : -1);
    const stepCol = toCol === this.col ? 0 : (toCol > this.col ? 1 : -1);

    let r = this.row + stepRow;
    let c = this.col + stepCol;

    while (r !== toRow || c !== toCol) {
      if (board[r][c] !== null) return false;
      r += stepRow;
      c += stepCol;
    }

    const target = board[toRow][toCol];
    return target === null || target.color !== this.color;
  }
}
