import { Piece } from "./Piece.js";

export class Rook extends Piece {
  hasMoved: boolean = false;
  constructor(color: "white" | "black", row: number, col: number) {
    super(color, row, col, color === "white" ? "♖" : "♜");
  }

  move(row: number, col: number): void {
    super.move(row, col);
    this.hasMoved = true;
  }

  clone(): Rook {
    const clone = new Rook(this.color, this.row, this.col);
    clone.hasMoved = this.hasMoved;
    return clone;
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
