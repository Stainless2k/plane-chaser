import React from 'react';
import { GoodCard } from '../logic/types';
import { useGameStore } from '../logic/UseGameStore';
import { CARDINAL_DIRECTIONS } from '../logic/Grid';
import { planeAspectRatio, PlaneCard } from '../comp/PlaneCard';
import { useFetchCardPicture } from '../logic/useFetchCardPicture';

// const FIELDSIZE_X = 7;
// const FIELDSIZE_Y = 7;

function indexToDirection(index: number) {
  switch (index) {
    case 17:
      return CARDINAL_DIRECTIONS.UP;
    case 23:
      return CARDINAL_DIRECTIONS.LEFT;
    case 25:
      return CARDINAL_DIRECTIONS.RIGHT;
    case 31:
      return CARDINAL_DIRECTIONS.DOWN;
  }

  return undefined;
}

function Maptile({
  card,
  index,
}: {
  card: GoodCard | undefined;
  index: number;
}) {
  const walk = useGameStore((state) => state.walk);
  const { error, data } = useFetchCardPicture(card);

  if (!card)
    return (
      <div className={'flex items-center justify-center '}>
        <div>EMPTY: {index}</div>
      </div>
    );

  const direction = indexToDirection(index);

  const onClick = direction ? () => walk(direction) : undefined;

  return (
    <div
      className={'flex items-center justify-center bg-blue-600'}
      style={{ aspectRatio: planeAspectRatio.toString() }}
      onClick={onClick}
    >
      <PlaneCard data={data} error={error?.message} />
    </div>
  );
}

export default function EternitiesMap() {
  const { gameMap, startGame } = useGameStore((state) => {
    return { gameMap: state.gameMap, startGame: state.startGame };
  });

  return (
    <div
      className={
        'background-animate flex h-screen w-screen items-center justify-center'
      }
    >
      <div
        className={'grid max-h-screen grid-cols-7 grid-rows-7 gap-0.5'}
        style={{ aspectRatio: planeAspectRatio.toString() }}
      >
        {gameMap.toArray().map((card, index) => (
          <Maptile card={card} index={index} key={card?.name ?? index} />
        ))}
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
