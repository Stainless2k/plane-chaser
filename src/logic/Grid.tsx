export enum CARDINAL_DIRECTIONS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const OPPOSITE_DIRECTION: Record<
  CARDINAL_DIRECTIONS,
  CARDINAL_DIRECTIONS
> = {
  [CARDINAL_DIRECTIONS.UP]: CARDINAL_DIRECTIONS.DOWN,
  [CARDINAL_DIRECTIONS.DOWN]: CARDINAL_DIRECTIONS.UP,
  [CARDINAL_DIRECTIONS.LEFT]: CARDINAL_DIRECTIONS.RIGHT,
  [CARDINAL_DIRECTIONS.RIGHT]: CARDINAL_DIRECTIONS.LEFT,
};

export class Grid<T> {
  readonly rowLength: number;
  readonly colLength: number;
  private readonly __cells: (T | undefined)[];

  constructor(rowLength: number, colLength: number, items?: (T | undefined)[]) {
    this.__cells = items ?? Array(rowLength * colLength);
    this.rowLength = rowLength;
    this.colLength = colLength;
  }

  private __getIndex(row: number, col: number) {
    this.__checkRowIndex(row);
    this.__checkColIndex(col);

    return row * this.rowLength + col;
  }

  private __checkColIndex(col: number) {
    if (col >= this.colLength)
      throw Error(
        `INDEX ${col} IS OUT OF BOUNDS FOR COL SIZE ${this.colLength}`
      );
  }

  private __checkRowIndex(row: number) {
    if (row >= this.rowLength)
      throw Error(
        `INDEX ${row} IS OUT OF BOUNDS FOR ROW SIZE ${this.rowLength}`
      );
  }

  get(row: number, col: number): T | undefined {
    return this.__cells[this.__getIndex(row, col)];
  }

  getRow(row: number): (T | undefined)[] {
    this.__checkRowIndex(row);

    const start = row * this.rowLength;
    const end = start + this.rowLength;

    return this.__cells.slice(start, end);
  }

  getCol(col: number): (T | undefined)[] {
    this.__checkColIndex(col);

    const result = Array(this.colLength);

    for (let i = 0; i < this.colLength; i++) {
      result[i] = this.__cells[col + i * this.rowLength];
    }

    return result;
  }

  set(row: number, col: number, value: T | undefined): Grid<T> {
    const newCells = this.__cells.slice(0);

    const index = this.__getIndex(row, col);
    newCells[index] = value;

    return new Grid(this.rowLength, this.colLength, newCells);
  }

  delete(row: number, col: number): Grid<T> {
    return this.set(row, col, undefined);
  }

  deleteRow(row: number): Grid<T> {
    this.__checkRowIndex(row);
    const newCells = this.__cells.slice(0);

    const start = row * this.rowLength;
    for (let i = start; i < this.rowLength; i++) {
      newCells[start + 1] = undefined;
    }

    return new Grid(this.rowLength, this.colLength, newCells);
  }

  deleteCol(col: number): Grid<T> {
    this.__checkRowIndex(col);
    const newCells = this.__cells.slice(0);

    for (let i = 0; i < this.colLength; i++) {
      newCells[col + i * this.rowLength] = undefined;
    }

    return new Grid(this.rowLength, this.colLength, newCells);
  }

  deleteMany(cords: [number, number][]) {
    const newCells = this.__cells.slice(0);

    cords.forEach(([row, col]) => {
      const index = this.__getIndex(row, col);
      newCells[index] = undefined;
    });

    return new Grid(this.rowLength, this.colLength, newCells);
  }

  shift(direction: CARDINAL_DIRECTIONS): Grid<T> {
    switch (direction) {
      case CARDINAL_DIRECTIONS.UP:
        return new Grid(
          this.rowLength,
          this.colLength,
          // take all except first row and add new one at bottom
          this.__cells.slice(this.rowLength).concat(Array(this.rowLength))
        );
      case CARDINAL_DIRECTIONS.DOWN:
        return new Grid(
          this.rowLength,
          this.colLength,
          // take all except last row and add new one at top
          Array(this.rowLength).concat(
            this.__cells.slice(0, -(this.rowLength - 1))
          )
        );
      case CARDINAL_DIRECTIONS.LEFT:
        // for each row
        // remove fist element and add one at the end
        break;
      case CARDINAL_DIRECTIONS.RIGHT:
        break;
    }
  }

  toArray() {
    return this.__cells.slice(0);
  }
}
