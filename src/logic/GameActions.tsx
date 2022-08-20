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

type GameState<T> = { gameMap: Grid<T>; deck: T[] };

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
  { deck, gameMap }: GameState<T>
): GameState<T> {
  const removed = gameMap.get(row, col);
  // nothing to return if the space is empty
  if (!removed) return { deck, gameMap };

  return { deck: deck.concat(removed), gameMap: gameMap.delete(row, col) };
}

function returnCornersToDeck<T>({ deck, gameMap }: GameState<T>): GameState<T> {
  // remove empty so we dont put it into the deck
  const removed = CORNERS.map(([row, col]) => gameMap.get(row, col)).filter(
    notEmpty
  );
  // nothing to do if all coners were empty
  if (removed.length < 1) return { deck, gameMap };

  return { deck: deck.concat(removed), gameMap: gameMap.deleteMany(CORNERS) };
}

function returnOuterRowOrColToDeck<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, gameMap }: GameState<T>
): GameState<T> {
  switch (direction) {
    case CARDINAL_DIRECTIONS.UP:
      return {
        deck: deck.concat(gameMap.getRow(0).filter(notEmpty)),
        gameMap: gameMap.deleteRow(0),
      };
    case CARDINAL_DIRECTIONS.DOWN:
      return {
        deck: deck.concat(
          gameMap.getRow(gameMap.colLength - 1).filter(notEmpty)
        ),
        gameMap: gameMap.deleteRow(gameMap.colLength - 1),
      };
    case CARDINAL_DIRECTIONS.LEFT:
      return {
        deck: deck.concat(gameMap.getCol(0).filter(notEmpty)),
        gameMap: gameMap.deleteCol(0),
      };
    case CARDINAL_DIRECTIONS.RIGHT:
      return {
        deck: deck.concat(
          gameMap.getCol(gameMap.rowLength - 1).filter(notEmpty)
        ),
        gameMap: gameMap.deleteCol(gameMap.rowLength - 1),
      };
  }
}

function discover<T>(
  [row, col]: Point,
  { deck, gameMap }: GameState<T>
): GameState<T> {
  // already discovered do nothing
  if (gameMap.get(row, col) != undefined) return { deck, gameMap };

  const [discovered, restDeck] = draw(deck);

  return { deck: restDeck, gameMap: gameMap.set(row, col, discovered) };
}

function move<T>(
  direction: CARDINAL_DIRECTIONS,
  state: GameState<T>
): GameState<T> {
  // remove opposite edge...
  const oppositeDirection = OPPOSITE_DIRECTION[direction];
  const { deck, gameMap } = returnOuterRowOrColToDeck(oppositeDirection, state);
  // ...because we push the grid in opposite direction to move in direction
  return {
    gameMap: gameMap.shift(oppositeDirection),
    deck: deck,
  };
}

const MIDDLE: Point = [3, 3];

export function walk<T>(
  direction: CARDINAL_DIRECTIONS,
  { deck, gameMap }: GameState<T>
): GameState<T> {
  const newMiddle = addPoints(DIRECTION_VECTORS[direction], MIDDLE);
  const newMiddleNeighbours = gameMap.getAdjacentPoints(...newMiddle);
  // reveal new planes
  const discoveredState = newMiddleNeighbours.reduce(
    (gameState, neighbour) => discover(neighbour, gameState),
    {
      gameMap,
      deck,
    }
  );
  // move selected plane into the middle
  const movedState = move(direction, discoveredState);
  // remove corners
  return returnCornersToDeck(movedState);
}

export function startGame<T>({ deck, gameMap }: GameState<T>): GameState<T> {
  const newMiddleNeighbours = gameMap.getAdjacentPoints(...MIDDLE);
  // reveal new planes
  return newMiddleNeighbours.reduce(
    (gameState, neighbour) => discover(neighbour, gameState),
    {
      gameMap,
      deck,
    }
  );
}
