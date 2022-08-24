import React, { useRef } from 'react';
import { GoodCard } from '../logic/types';
import { useGameStore } from '../logic/UseGameStore';
import { CARDINAL_DIRECTIONS } from '../logic/Grid';
import { planeAspectRatio, PlaneCard } from '../comp/PlaneCard';
import { useFetchCardPicture } from '../logic/useFetchCardPicture';
import { useLongPress } from 'use-long-press';

const FIELD_SIZE_X = 7;
const FIELD_SIZE_Y = 7;

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

function indexToCords(index: number) {
  const x = index % FIELD_SIZE_X;
  const y = Math.floor(index / FIELD_SIZE_Y);
  return { x, y };
}

async function zoomMiddle(ref: React.RefObject<HTMLDivElement>) {
  (await import('../logic/zoom')).zoom.to({
    element: ref.current,
  });
}

function MapTile({ card, index }: { card: GoodCard; index: number }) {
  const midRef = useRef<HTMLDivElement>(null);
  const walk = useGameStore((state) => state.walk);
  const { error, data } = useFetchCardPicture(card);

  const direction = indexToDirection(index);
  const longPressWalk = useLongPress(
    direction ? () => walk(direction) : null
  )();

  const isMiddle = index === 24 ? midRef : undefined;
  const onClick = isMiddle ? () => zoomMiddle(midRef) : undefined;

  const borderStyle = direction ? { border: '2px solid #fff600' } : undefined;
  const { x, y } = indexToCords(index);

  return (
    <div
      ref={isMiddle}
      onClick={onClick}
      {...longPressWalk}
      className={'flex items-center justify-center bg-blue-600'}
      style={{
        aspectRatio: planeAspectRatio.toString(),
        gridRow: x + 1,
        gridColumn: y + 1,
        ...borderStyle,
      }}
    >
      <PlaneCard data={data} error={error?.message} />
    </div>
  );
}

export default function EternitiesMap() {
  const { gameMap, startGame } = useGameStore(({ gameMap, startGame }) => {
    return { gameMap, startGame };
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
        {gameMap
          .toArray()
          .map((card, index) =>
            card ? <MapTile card={card} index={index} key={card.name} /> : null
          )}
      </div>
      <div className={'absolute top-0 left-0 bg-green-600'}>
        <button onClick={() => startGame()}>START</button>
      </div>
    </div>
  );
}
