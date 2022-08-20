import { notEmpty } from './NotEmpty';
import { CARDINAL_DIRECTIONS, Grid } from './Grid';
import { takeRandom } from './RNG';

type Point = [number, number];
const CORNERS: Point[] = [
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

export const OPPOSITE_DIRECTION: Record<
  CARDINAL_DIRECTIONS,
  CARDINAL_DIRECTIONS
> = {
  [CARDINAL_DIRECTIONS.UP]: CARDINAL_DIRECTIONS.DOWN,
  [CARDINAL_DIRECTIONS.DOWN]: CARDINAL_DIRECTIONS.UP,
  [CARDINAL_DIRECTIONS.LEFT]: CARDINAL_DIRECTIONS.RIGHT,
  [CARDINAL_DIRECTIONS.RIGHT]: CARDINAL_DIRECTIONS.LEFT,
};

export const getNeighbours(row: number, col: number): Point[] {
  const up = [row+1,col]
  const down = [row-1,col]
  const right = [row,col+1]
  const left= [row,col-1]
}

type GameState<T> = { field: Grid<T>; deck: T[] };

export enum HELLRIDE_DIRECTIONS {
  UP_LEFT = 'UP_LEFT',
  UP_RIGHT = 'UP_RIGHT',
  DOWN_RIGHT = 'DOWN_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
}

function draw<T>(deck: T[]): [T, T[]] {
  return takeRandom(deck);
}

function returnToDeck<T>(
  [ row, col ]: Point,
  { deck, field }: GameState<T>
): GameState<T> {
  const removed = field.get(row, col);
  if (!removed) return { deck, field };

  return { deck: deck.concat(removed), field: field.delete(row, col) };
}

function returnCornersToDeck<T>({ deck, field }: GameState<T>): GameState<T> {
  const removed = CORNERS.map(([row, col]) => field.get(row, col)).filter(
    notEmpty
  );
  if (removed.length < 1) return { deck, field };

  return { deck: deck.concat(removed), field: field.deleteMany(CORNERS) };
}

function returnOuterRowOrColToDeck<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, field }: GameState<T>
): GameState<T> {
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

function discover<T>(
  [ row, col ]: Point,
  { deck, field }: GameState<T>
): GameState<T> {
  // already discovered do nothing
  if (field.get(row, col) != undefined) return { deck, field };

  const [discovered, restDeck] = draw(deck);

  return { deck: restDeck, field: field.set(row, col, discovered) };
}

function move<T>(
  direction: CARDINAL_DIRECTIONS,
  state: GameState<T>
): GameState<T> {
  const oppositeDirection = OPPOSITE_DIRECTION[direction];
  const { deck, field } = returnOuterRowOrColToDeck(oppositeDirection, state);

  return {
    field: field.shift(oppositeDirection),
    deck: deck,
  };
}

export function walk<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, field }: GameState<T>
): GameState<T> {
  // TODO
  // discover()
  // move()
  // remove coners
}
