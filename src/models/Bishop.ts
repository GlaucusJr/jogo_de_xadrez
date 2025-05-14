// import { Piece } from "./Piece.js";

// export class Bishop extends Piece {
//   constructor(color: "white" | "black", row: number, col: number) {
//     super(color, row, col, color === "white" ? "♗" : "♝");
//   }

//   isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
//     if (Math.abs(toRow - this.row) !== Math.abs(toCol - this.col)) {
//       return false;
//     }

//     const rowStep = toRow > this.row ? 1 : -1;
//     const colStep = toCol > this.col ? 1 : -1;

//     let currentRow = this.row + rowStep;
//     let currentCol = this.col + colStep;

//     while (currentRow !== toRow && currentCol !== toCol) {
//       if (board[currentRow][currentCol] !== null) {
//         return false;
//       }
//       currentRow += rowStep;
//       currentCol += colStep;
//     }

//     const destination = board[toRow][toCol];
//     return destination === null || destination.color !== this.color;
//   }
// }

import { Piece } from "./Piece.js";

export class Bishop extends Piece {
  isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean {
    const rowDiff = Math.abs(toRow - this.row);
    const colDiff = Math.abs(toCol - this.col);

    if (rowDiff !== colDiff) return false;

    const rowStep = toRow > this.row ? 1 : -1;
    const colStep = toCol > this.col ? 1 : -1;

    let currentRow = this.row + rowStep;
    let currentCol = this.col + colStep;

    while (currentRow !== toRow && currentCol !== toCol) {
      // Verifica se está dentro dos limites
      if (
        currentRow < 0 || currentRow > 7 ||
        currentCol < 0 || currentCol > 7
      ) return false;

      if (board[currentRow][currentCol]) return false;

      currentRow += rowStep;
      currentCol += colStep;
    }

    // Movimento final: só é válido se for captura de inimigo ou casa vazia
    const targetPiece = board[toRow][toCol];
    return !targetPiece || targetPiece.color !== this.color;
  }
}
