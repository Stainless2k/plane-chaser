export type Point = [number, number];

export function addPoints(a: Point, b: Point): Point {
  return [a[0] + b[0], a[1] + b[1]];
}

export enum CARDINAL_DIRECTIONS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const DIRECTION_VECTORS: Record<CARDINAL_DIRECTIONS, Point> = {
  [CARDINAL_DIRECTIONS.UP]: [-1, 0],
  [CARDINAL_DIRECTIONS.RIGHT]: [0, +1],
  [CARDINAL_DIRECTIONS.DOWN]: [+1, 0],
  [CARDINAL_DIRECTIONS.LEFT]: [0, -1],
};

export class Grid<T> {
  readonly rowLength: number;
  readonly colLength: number;
  private readonly __cells: (T | undefined)[];

  constructor(rowLength: number, colLength: number, items?: (T | undefined)[]) {
    this.__cells = items ?? Array(rowLength * colLength).fill(undefined);
    this.rowLength = rowLength;
    this.colLength = colLength;
  }

  private __getIndex(row: number, col: number) {
    this.__checkRowIndex(row);
    this.__checkColIndex(col);

    return row * this.rowLength + col;
  }

  private __checkColIndex(col: number) {
    if (col >= this.colLength || col < 0)
      throw Error(
        `INDEX ${col} IS OUT OF BOUNDS FOR COL SIZE ${this.colLength}`
      );
  }

  private __checkRowIndex(row: number) {
    if (row >= this.rowLength || row < 0)
      throw Error(
        `INDEX ${row} IS OUT OF BOUNDS FOR ROW SIZE ${this.rowLength}`
      );
  }

  private __getAllRows(): (T | undefined)[][] {
    const rows = Array(this.rowLength);
    for (let i = 0; i < this.rowLength; i++) {
      rows.push(this.getRow(i));
    }
    return rows;
  }

  getAdjacentPoints(row: number, col: number): Point[] {
    return Object.values(DIRECTION_VECTORS)
      .map<Point>(([vRow, vCol]) => [row + vRow, col + vCol])
      .filter(
        ([rRow, rCol]) =>
          rRow > -1 &&
          rCol > -1 &&
          rRow < this.rowLength &&
          rCol < this.colLength
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
    for (let i = 0; i < this.rowLength; i++) {
      newCells[start + i] = undefined;
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

  deleteMany(cords: Point[]) {
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
          this.__cells
            .slice(this.rowLength)
            .concat(Array(this.rowLength).fill(undefined))
        );
      case CARDINAL_DIRECTIONS.DOWN:
        return new Grid(
          this.rowLength,
          this.colLength,
          // take all except last row and add new one at top
          Array(this.rowLength)
            .fill(undefined)
            .concat(this.__cells.slice(0, -this.rowLength))
        );
      case CARDINAL_DIRECTIONS.LEFT: {
        return new Grid(
          this.rowLength,
          this.colLength,
          // for each row remove first and add empty to end
          this.__getAllRows().reduce(
            (previousValue, currentValue) =>
              previousValue.concat(currentValue.slice(1), undefined),
            []
          )
        );
      }
      case CARDINAL_DIRECTIONS.RIGHT:
        return new Grid(
          this.rowLength,
          this.colLength,
          // for each row remove last and add empty to start
          this.__getAllRows().reduce(
            (previousValue, currentValue) =>
              previousValue.concat(undefined, currentValue.slice(0, -1)),
            []
          )
        );
    }
  }

  toArray() {
    return this.__cells.slice(0);
  }

  toString() {
    const rows = [];
    for (let i = 0; i < this.rowLength; i++) {
      rows.push(this.getRow(i).join(' | '));
    }

    return rows.join('\n');
  }
}
