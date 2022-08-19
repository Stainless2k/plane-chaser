import React from 'react';
import all_planes from '../data/all_planes.json';
import _ from 'lodash';
import { GoodCard } from '../logic/types';

const FIELDSIZE_X = 7;
const FIELDSIZE_Y = 7;
const CORNERS: [number, number][] = [
  // UP LEFT
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [2, 0],
  // UP RIGHT
  [0, 4],
  [0, 6],
  [0, 6],
  [1, 5],
  [1, 6],
  [2, 6],
  // BOTTOM LEFT
  [4, 0],
  [5, 0],
  [5, 1],
  [6, 0],
  [6, 1],
  [6, 2],
  // BOTTOM RIGHT
  [4, 6],
  [5, 5],
  [5, 6],
  [6, 4],
  [6, 5],
  [6, 6],
];

function notEmpty<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}

class Grid<T> {
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

  toArray() {
    return this.__cells.slice(0);
  }
}

type GameState = { field: Grid<GoodCard>; deck: GoodCard[] };

type Cord = { row: number; col: number };

enum CARDINAL_DIRECTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

enum HELLRIDE_DIRECTIONS {
  UP_LEFT,
  UP_RIGHT,
  DOWN_RIGHT,
  DOWN_LEFT,
}

const OPPOSITE_DIRECTION: Record<CARDINAL_DIRECTIONS, CARDINAL_DIRECTIONS> = {
  [CARDINAL_DIRECTIONS.UP]: CARDINAL_DIRECTIONS.DOWN,
  [CARDINAL_DIRECTIONS.DOWN]: CARDINAL_DIRECTIONS.UP,
  [CARDINAL_DIRECTIONS.LEFT]: CARDINAL_DIRECTIONS.RIGHT,
  [CARDINAL_DIRECTIONS.RIGHT]: CARDINAL_DIRECTIONS.LEFT,
};

interface EternitesMapStore {
  deck: GoodCard[];
  map: Grid<GoodCard>;
  walk: (direction: CARDINAL_DIRECTIONS) => void;
  hellRide: (direction: HELLRIDE_DIRECTIONS) => void;
  startGame: () => void;
}

function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function takeRandom<T>(array: T[]): [T, T[]] {
  const index = getRandomNumber(0, array.length - 1);
  const take = array[index] as T;

  if (index === 0) return [take, array.slice(1)];
  if (index === array.length - 1) return [take, array.slice(0, -1)];

  const restDeck = array.slice(0, index).concat(array.slice(index + 1));

  return [take, restDeck];
}

function draw(deck: GoodCard[]): [GoodCard, GoodCard[]] {
  return takeRandom(deck);
}

function returnToDeck(
  { row, col }: Cord,
  { deck, field }: GameState
): GameState {
  const removed = field.get(row, col);
  if (!removed) return { deck, field };

  return { deck: deck.concat(removed), field: field.delete(row, col) };
}

function returnCornersToDeck({ deck, field }: GameState): GameState {
  const removed = CORNERS.map(([row, col]) => field.get(row, col)).filter(
    notEmpty
  );
  if (removed.length < 1) return { deck, field };

  return { deck: deck.concat(removed), field: field.deleteMany(CORNERS) };
}

function returnOuterRowOrColToDeck(
  direction: CARDINAL_DIRECTIONS,
  { deck, field }: GameState
): GameState {
  switch (direction) {
    case CARDINAL_DIRECTIONS.UP:
      return {
        deck: deck.concat(field.getRow(0).filter(notEmpty)),
        field: field.deleteRow(0),
      };
    case CARDINAL_DIRECTIONS.DOWN:
      return {
        deck: deck.concat(field.getRow(field.colLength - 1).filter(notEmpty)),
        field: field.deleteRow(field.colLength - 1),
      };
    case CARDINAL_DIRECTIONS.LEFT:
      return {
        deck: deck.concat(field.getCol(0).filter(notEmpty)),
        field: field.deleteCol(0),
      };
    case CARDINAL_DIRECTIONS.RIGHT:
      return {
        deck: deck.concat(field.getCol(field.rowLength - 1).filter(notEmpty)),
        field: field.deleteCol(field.rowLength - 1),
      };
  }
}

function discover({ row, col }: Cord, { deck, field }: GameState): GameState {
  // already discovered do nothing
  if (field.get(row, col) != undefined) return { deck, field };

  const [discovered, restDeck] = draw(deck);

  return { deck: restDeck, field: field.set(row, col, discovered) };
}

function move(direction: CARDINAL_DIRECTIONS, state: GameState): GameState {
  // TODO
  const oppositeDirection = OPPOSITE_DIRECTION[direction];
  const outerReturnedState = returnOuterRowOrColToDeck(
    oppositeDirection,
    state
  );

  switch (direction) {
    case CARDINAL_DIRECTIONS.UP:
      break;
    case CARDINAL_DIRECTIONS.DOWN:
      break;
    case CARDINAL_DIRECTIONS.LEFT:
      break;
    case CARDINAL_DIRECTIONS.RIGHT:
      break;
  }
}

function walk(
  direction: CARDINAL_DIRECTIONS,
  { deck, field }: GameState
): GameState {
  // TODO
  // discover()
  // move()
  // remove coners
}

export async function getStaticProps() {
  const planes: GoodCard[] = all_planes.cards.map(
    ({ name, image_uris: { border_crop } }) => ({
      name,
      image_uris: { border_crop },
    })
  );

  return {
    props: { cards: _.shuffle(planes) }, // will be passed to the page component as props
  };
}

export default function EternitiesMap({ cards }: { cards: GoodCard[] }) {
  return (
    <div
      className={
        'background-animate flex h-screen w-screen items-center justify-center'
      }
    >
      <div className={'grid h-full w-full grid-cols-7 grid-rows-7 gap-0.5'}>
        {[...Array(7 * 7).keys()].map((_, index) => (
          <div className={'border-2 border-red-700 text-center'} key={index}>
            {index}
          </div>
        ))}
      </div>
    </div>
  );
}
