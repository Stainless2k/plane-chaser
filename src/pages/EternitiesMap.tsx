import React from 'react';
import all_planes from '../data/all_planes.json';
import _ from 'lodash';
import { GoodCard } from '../logic/types';
import { CARDINAL_DIRECTIONS, Grid, OPPOSITE_DIRECTION } from '../logic/Grid';
import { notEmpty } from '../logic/NotEmpty';
import { takeRandom } from '../logic/RNG';

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

type GameState = { field: Grid<T>; deck: T[] };
type Cord = { row: number; col: number };

enum HELLRIDE_DIRECTIONS {
  UP_LEFT = 'UP_LEFT',
  UP_RIGHT = 'UP_RIGHT',
  DOWN_RIGHT = 'DOWN_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
}

interface EternitesMapStore {
  deck: GoodCard[];
  map: Grid<GoodCard>;
  walk: (direction: CARDINAL_DIRECTIONS) => void;
  hellRide: (direction: HELLRIDE_DIRECTIONS) => void;
  startGame: () => void;
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
