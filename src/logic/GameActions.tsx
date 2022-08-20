import { notEmpty } from './NotEmpty';
import {
  addPoints,
  CARDINAL_DIRECTIONS,
  DIRECTION_VECTORS,
  Grid,
  Point,
} from './Grid';
import { takeRandom } from './RNG';

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

type GameState<T> = { map: Grid<T>; deck: T[] };

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
  [row, col]: Point,
  { deck, map }: GameState<T>
): GameState<T> {
  const removed = map.get(row, col);
  // nothing to return if the space is empty
  if (!removed) return { deck, map };

  return { deck: deck.concat(removed), map: map.delete(row, col) };
}

function returnCornersToDeck<T>({ deck, map }: GameState<T>): GameState<T> {
  // remove empty so we dont put it into the deck
  const removed = CORNERS.map(([row, col]) => map.get(row, col)).filter(
    notEmpty
  );
  // nothing to do if all coners were empty
  if (removed.length < 1) return { deck, map };

  return { deck: deck.concat(removed), map: map.deleteMany(CORNERS) };
}

function returnOuterRowOrColToDeck<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, map }: GameState<T>
): GameState<T> {
  switch (direction) {
    case CARDINAL_DIRECTIONS.UP:
      return {
        deck: deck.concat(map.getRow(0).filter(notEmpty)),
        map: map.deleteRow(0),
      };
    case CARDINAL_DIRECTIONS.DOWN:
      return {
        deck: deck.concat(map.getRow(map.colLength - 1).filter(notEmpty)),
        map: map.deleteRow(map.colLength - 1),
      };
    case CARDINAL_DIRECTIONS.LEFT:
      return {
        deck: deck.concat(map.getCol(0).filter(notEmpty)),
        map: map.deleteCol(0),
      };
    case CARDINAL_DIRECTIONS.RIGHT:
      return {
        deck: deck.concat(map.getCol(map.rowLength - 1).filter(notEmpty)),
        map: map.deleteCol(map.rowLength - 1),
      };
  }
}

function discover<T>(
  [row, col]: Point,
  { deck, map }: GameState<T>
): GameState<T> {
  // already discovered do nothing
  if (map.get(row, col) != undefined) return { deck, map };

  const [discovered, restDeck] = draw(deck);

  return { deck: restDeck, map: map.set(row, col, discovered) };
}

function move<T>(
  direction: CARDINAL_DIRECTIONS,
  state: GameState<T>
): GameState<T> {
  // remove opposite edge...
  const oppositeDirection = OPPOSITE_DIRECTION[direction];
  const { deck, map } = returnOuterRowOrColToDeck(oppositeDirection, state);

  // ...because we push the grid in opposite direction to move in direction
  return {
    map: map.shift(oppositeDirection),
    deck: deck,
  };
}

const MIDDLE: Point = [3, 3];

export function walk<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, map }: GameState<T>
): GameState<T> {
  const newMiddle = addPoints(DIRECTION_VECTORS[direction], MIDDLE);
  const newMiddleNeighbours = map.getAdjacentPoints(...newMiddle);
  // reveal new planes
  const discoveredState = newMiddleNeighbours.reduce(
    (gameState, neighbour) => discover(neighbour, gameState),
    {
      map,
      deck,
    }
  );
  // move selected plane into the middle
  const movedState = move(direction, discoveredState);
  // remove corners
  return returnCornersToDeck(movedState);
}

export function startGame<T>(state: GameState<T>): GameState<T> {}
