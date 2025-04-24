export type Color = "white" | "black";

export abstract class Piece {
  constructor(
    public color: Color,
    public row: number,
    public col: number,
    public symbol: string
  ) {}

  abstract isValidMove(toRow: number, toCol: number, board: (Piece | null)[][]): boolean;

  move(toRow: number, toCol: number) {
    this.row = toRow;
    this.col = toCol;
  }
}
