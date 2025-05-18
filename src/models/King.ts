import { Piece, Color } from "./Piece.js";
import { Rook } from "./Rook.js";

export class King extends Piece {
  symbol = this.color === "white" ? "♔" : "♚";
  hasMoved = false;
  constructor(color: Color, row: number, col: number, symbol: string = color === "white" ? "♔" : "♚") {
    super(color, row, col, symbol);
  }
  
  isValidMove(row: number, col: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(this.row - row);
    const colDiff = Math.abs(this.col - col);

    // Movimento normal do rei (1 casa em qualquer direção)
    if (rowDiff <= 1 && colDiff <= 1) return true;

    // Roque
    if (!this.hasMoved && rowDiff === 0 && colDiff === 2) {
      const direction = col > this.col ? 1 : -1;
      const rookCol = col > this.col ? 7 : 0;
      const rook = board[row][rookCol];

      if (!(rook instanceof Rook) || rook.color !== this.color || rook.hasMoved) {
        return false;
      }

      // Verifica se há peças entre rei e torre
      const start = Math.min(this.col, rookCol) + 1;
      const end = Math.max(this.col, rookCol);
      for (let c = start; c < end; c++) {
        if (board[row][c]) return false;
      }

    // Verifica se o rei está em xeque ou passará por casas sob ataque
    // Esta verificação depende da implementação do seu método isInCheck
    // Certifique-se de que ele verifica se o rei está em xeque após cada movimento

    return true;
  }

  return false;
}


  move(row: number, col: number): void {
    super.move(row, col);
    this.hasMoved = true;
  }

  clone(): King {
    const clone = new King(this.color, this.row, this.col);
    clone.hasMoved = this.hasMoved;
    return clone;
  }
}
