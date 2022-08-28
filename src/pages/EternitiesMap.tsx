import React, { useRef } from 'react';
import { GoodCard } from '../logic/types';
import { useGameStore } from '../logic/UseGameStore';
import { CARDINAL_DIRECTIONS, Grid } from '../logic/Grid';
import { planeAspectRatio, PlaneCard } from '../comp/PlaneCard';
import { useFetchCardPicture } from '../logic/useFetchCardPicture';
import { useLongPress } from 'use-long-press';
import { Flipped, Flipper } from 'react-flip-toolkit';
import {
  ReactZoomPanPinchHandlers,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

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

function MapTile({
  card,
  index,
  zoomToElement,
  ...rest
}: {
  card: GoodCard;
  index: number;
  zoomToElement: ReactZoomPanPinchHandlers['zoomToElement'];
}) {
  const walk = useGameStore((state) => state.walk);
  const elementRef = useRef<HTMLDivElement>(null);

  const { error, data } = useFetchCardPicture(card);

  const direction = indexToDirection(index);
  const longPressWalk = useLongPress(
    direction ? () => walk(direction) : null
  )();

  const isMiddle = index === 24;

  const borderStyle = isMiddle
    ? { border: '2px solid #fc037f' }
    : direction
    ? { border: '2px solid #fff600' }
    : undefined;
  const { x, y } = indexToCords(index);

  return (
    <div
      ref={elementRef}
      {...rest}
      {...longPressWalk}
      onClick={() => zoomToElement(elementRef?.current ?? '', 4)}
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

function PlayingGrid({
  gameMap,
  zoomToElement,
}: {
  gameMap: Grid<GoodCard>;
  zoomToElement: ReactZoomPanPinchHandlers['zoomToElement'];
}) {
  const gameMapArray = gameMap.toArray();
  const key = gameMapArray.map((c) => c?.name ?? 'X').join(' ');

  return (
    <Flipper
      flipKey={key}
      spring={'wobbly'}
      staggerConfig={{ default: { reverse: true } }}
    >
      <div
        className={'grid max-h-screen grid-cols-7 grid-rows-7 gap-0.5'}
        style={{ aspectRatio: planeAspectRatio.toString() }}
      >
        {gameMapArray.map((card, index) =>
          card ? (
            <Flipped flipId={card.name} key={card.name}>
              <MapTile
                card={card}
                index={index}
                zoomToElement={zoomToElement}
              />
            </Flipped>
          ) : null
        )}
      </div>
    </Flipper>
  );
}

export default function EternitiesMap() {
  const { gameMap, startGame } = useGameStore(({ gameMap, startGame }) => {
    return { gameMap, startGame };
  });

  return (
    <TransformWrapper doubleClick={{ mode: 'reset' }}>
      {({ zoomToElement }) => (
        <>
          <TransformComponent>
            <div
              className={
                'background-animate -z-40 flex h-screen w-screen items-center justify-center'
              }
            >
              <PlayingGrid gameMap={gameMap} zoomToElement={zoomToElement} />
              <div className={'absolute top-0 left-0 bg-green-600'}>
                <button
                  onClick={(event) => {
                    startGame();
                    event.currentTarget.remove();
                  }}
                >
                  START
                </button>
                <button
                  onClick={() => document.documentElement.requestFullscreen()}
                >
                  FULLSCREEN
                </button>
              </div>
            </div>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
