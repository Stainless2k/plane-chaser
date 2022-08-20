import React from 'react';
import _ from 'lodash';
import { GoodCard } from '../logic/types';
import { planes, useGameStore } from './UseGameStore';
import { CARDINAL_DIRECTIONS } from '../logic/Grid';

const FIELDSIZE_X = 7;
const FIELDSIZE_Y = 7;

export async function getStaticProps() {
  return {
    props: { cards: _.shuffle(planes) }, // will be passed to the page component as props
  };
}

const middleNeighbours = [17, 23, 25, 31];
const directions: Record<17 | 23 | 25 | 31, CARDINAL_DIRECTIONS> = {
  '17': CARDINAL_DIRECTIONS.UP,
  '23': CARDINAL_DIRECTIONS.LEFT,
  '25': CARDINAL_DIRECTIONS.RIGHT,
  '31': CARDINAL_DIRECTIONS.DOWN,
};

export default function EternitiesMap({ cards }: { cards: GoodCard[] }) {
  const { deck, hellRide, gameMap, startGame, walk } = useGameStore();

  return (
    <div
      className={
        'background-animate flex h-screen w-screen items-center justify-center'
      }
    >
      <div className={'grid h-full w-full grid-cols-7 grid-rows-7 gap-0.5'}>
        {gameMap.toArray().map((card, index) => {
          const onClick = middleNeighbours.some((value) => value === index)
            ? () => walk(directions[index.toString()])
            : undefined;

          return (
            <div
              className={
                'flex items-center justify-center border-2 border-red-700'
              }
              key={card?.name ?? index}
              onClick={onClick}
            >
              <div>{card?.name ?? 'EMPTY ' + index}</div>
            </div>
          );
        })}
      </div>
      <button
        className={'absolute top-0 left-0 bg-green-600'}
        onClick={() => startGame()}
      >
        START
      </button>
    </div>
  );
}
