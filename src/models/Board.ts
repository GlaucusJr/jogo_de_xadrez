import { Piece } from "./Piece.js";
import { Rook } from "./Rook.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { Pawn } from "./Pawn.js";
import { Color } from "./Piece.js";

export class Board {
  board: (Piece | null)[][] = [];
  selectedPiece: Piece | null = null;
  currentTurn: Color = "white";

  constructor() {
    this.createEmptyBoard();
    this.addPieces();
  }

  createEmptyBoard() {
    this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
  }

  addPieces() {
    // Brancas
    this.board[7][0] = new Rook("white", 7, 0);
    this.board[7][1] = new Knight("white", 7, 1);
    this.board[7][2] = new Bishop("white", 7, 2);
    this.board[7][3] = new Queen("white", 7, 3);
    this.board[7][4] = new King("white", 7, 4);
    this.board[7][5] = new Bishop("white", 7, 5);
    this.board[7][6] = new Knight("white", 7, 6);
    this.board[7][7] = new Rook("white", 7, 7);
    for (let col = 0; col < 8; col++) {
      this.board[6][col] = new Pawn("white", 6, col);
    }

    // Pretas
    this.board[0][0] = new Rook("black", 0, 0);
    this.board[0][1] = new Knight("black", 0, 1);
    this.board[0][2] = new Bishop("black", 0, 2);
    this.board[0][3] = new Queen("black", 0, 3);
    this.board[0][4] = new King("black", 0, 4);
    this.board[0][5] = new Bishop("black", 0, 5);
    this.board[0][6] = new Knight("black", 0, 6);
    this.board[0][7] = new Rook("black", 0, 7);
    for (let col = 0; col < 8; col++) {
      this.board[1][col] = new Pawn("black", 1, col);
    }
  }

  render(container: HTMLElement) {
    container.innerHTML = "";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.className = "square " + ((row + col) % 2 === 0 ? "light" : "dark");
        square.dataset.row = row.toString();
        square.dataset.col = col.toString();

        const piece = this.board[row][col];
        if (piece) {
          square.textContent = piece.symbol;
        }

        if (this.selectedPiece) {
          if (piece === this.selectedPiece) {
            square.classList.add("selected");
          }

          try {
            if (this.selectedPiece.isValidMove(row, col, this.board)) {
              square.classList.add("highlight");
            }
          } catch (e) {
            console.error("Erro ao verificar movimento:", e);
          }
        }

        square.addEventListener("click", () => {
          const row = parseInt(square.dataset.row!);
          const col = parseInt(square.dataset.col!);
          this.handleSquareClick(row, col);
        });

        container.appendChild(square);
      }
    }
  }

handleSquareClick(row: number, col: number) {
  const clickedPiece = this.board[row][col];

  if (this.selectedPiece) {
    if (this.selectedPiece.isValidMove(row, col, this.board)) {
      const target = this.board[row][col];
      if (!target || target.color !== this.selectedPiece.color) {
        // Simula o movimento para verificar se deixaria o rei em xeque
        const simulatedBoard = this.cloneBoard();
        const simulatedPiece = simulatedBoard[this.selectedPiece.row][this.selectedPiece.col];

        if (simulatedPiece) {
          simulatedBoard[row][col] = simulatedPiece;
          simulatedBoard[this.selectedPiece.row][this.selectedPiece.col] = null;
          simulatedPiece.move(row, col);

          if (this.simulateCheck(simulatedBoard, this.selectedPiece.color)) {
            alert("Jogada inválida: você ficaria em xeque!");
            this.selectedPiece = null;
            this.render(document.getElementById("board")!);
            return;
          }
        }

        // Executa o movimento real
        this.board[this.selectedPiece.row][this.selectedPiece.col] = null;
        this.board[row][col] = this.selectedPiece;
        this.selectedPiece.move(row, col);

        // Verifica se o adversário está em xeque ou xeque-mate
        const nextTurn = this.currentTurn === "white" ? "black" : "white";
        if (this.isInCheck(nextTurn)) {
          if (this.isCheckmate(nextTurn)) {
            alert(`Xeque-mate! ${nextTurn === "white" ? "Pretas" : "Brancas"} venceram!`);
          } else {
            alert("Xeque!");
          }
        }

        this.currentTurn = nextTurn;
      }

      this.selectedPiece = null;
      this.render(document.getElementById("board")!);
    } else {
      this.selectedPiece = null;
      this.render(document.getElementById("board")!);
    }
  } else if (clickedPiece && clickedPiece.color === this.currentTurn) {
    this.selectedPiece = clickedPiece;
    this.render(document.getElementById("board")!);
  }
}


  isInCheck(color: Color): boolean {
    const king = this.findKing(color);
    if (!king) return false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color !== color) {
          if (piece.isValidMove(king.row, king.col, this.board)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  isCheckmate(color: Color): boolean {
    if (!this.isInCheck(color)) return false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === color) {
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              if (piece.isValidMove(r, c, this.board)) {
                const simulatedBoard = this.cloneBoard();
                const simulatedPiece = simulatedBoard[row][col];

                if (!simulatedPiece) continue; // Proteção contra null

                // Simula o movimento
                simulatedBoard[r][c] = simulatedPiece;
                simulatedBoard[row][col] = null;
                simulatedPiece.move(r, c);

                // Verifica se ainda está em xeque
                if (!this.simulateCheck(simulatedBoard, color)) {
                  return false; // Existe uma jogada para sair do xeque
                }
              }
            }
          }
        }
      }
    }

  return true; // Nenhuma jogada válida encontrada => xeque-mate
}

  cloneBoard(): (Piece | null)[][] {
    return this.board.map(row => row.map(piece => piece ? piece.clone() : null));
  }

  simulateCheck(simulatedBoard: (Piece | null)[][], color: Color): boolean {
    const king = simulatedBoard.flat().find(
      piece => piece instanceof King && piece.color === color
    ) as King | undefined;

    if (!king) return true;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = simulatedBoard[row][col];
        if (piece && piece.color !== color) {
          if (piece.isValidMove(king.row, king.col, simulatedBoard)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  findKing(color: Color): King | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece instanceof King && piece.color === color) {
          return piece;
        }
      }
    }
    return null;
  }
}