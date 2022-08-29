import React from 'react';
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
import anime from 'animejs';
import {
  CallbackFlippedProps,
  HandleEnterUpdateDelete,
} from 'flip-toolkit/lib/types';

const FIELD_SIZE_X = 7;
const FIELD_SIZE_Y = 7;
const INFO_TEXT = `pink is the current plane
long press on yellow to walk there
click plane to zoom
click on background to reset zoom
double click to reset zoom
🤯 🤯 🤯 🤯 start by pressing start🤯 🤯 🤯 🤯 
`;

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

const animateElementIn: CallbackFlippedProps['onAppear'] = (el, i) =>
  anime({
    targets: el,
    opacity: 1,
    duration: 500,
    easing: 'easeOutSine',
    scale: [0, 1],
    rotate: '5turn',
  });

const animateElementOut: CallbackFlippedProps['onExit'] = (
  el,
  i,
  onComplete
) => {
  // not sure why this is needed
  el.style.position = '';
  el.style.width = '';
  el.style.height = '';
  anime({
    targets: el,
    opacity: 0,
    duration: 500,
    easing: 'easeOutSine',
    complete: onComplete,
    rotate: '5turn',
    scale: 0,
  });
};

const animationOrder: HandleEnterUpdateDelete = async ({
  animateEnteringElements,
  animateExitingElements,
  animateFlippedElements,
  hideEnteringElements,
}) => {
  hideEnteringElements();
  await animateExitingElements();
  animateFlippedElements();
  animateEnteringElements();
};

function MapTile({
  card,
  index,
  zoomToElement,
  resetTransform,
  ...rest
}: {
  card: GoodCard;
  index: number;
  zoomToElement: ReactZoomPanPinchHandlers['zoomToElement'];
  resetTransform: ReactZoomPanPinchHandlers['resetTransform'];
}) {
  const walk = useGameStore((state) => state.walk);

  const { error, data } = useFetchCardPicture(card);

  const direction = indexToDirection(index);
  const longPressWalk = useLongPress(
    direction
      ? async () => {
          resetTransform();
          await new Promise((r) => setTimeout(r, 300));
          walk(direction);
        }
      : null
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
      {...rest}
      {...longPressWalk}
      id={isMiddle ? 'middle' : undefined}
      onClick={(event) => zoomToElement(event.currentTarget, 4)}
      className={'z-10 flex items-center justify-center bg-blue-600'}
      style={{
        aspectRatio: planeAspectRatio.toString(),
        gridRow: x + 1,
        gridColumn: y + 1,
        transitionProperty: 'border-color',
        transitionDuration: '1s',
        transitionDelay: '0.5s',
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
  resetTransform,
}: {
  gameMap: Grid<GoodCard>;
  zoomToElement: ReactZoomPanPinchHandlers['zoomToElement'];
  resetTransform: ReactZoomPanPinchHandlers['resetTransform'];
}) {
  const gameMapArray = gameMap.toArray();
  const key = gameMapArray.map((c) => c?.name ?? 'X').join(' ');

  return (
    <Flipper
      flipKey={key}
      spring={'wobbly'}
      staggerConfig={{ default: { reverse: true } }}
      handleEnterUpdateDelete={animationOrder}
      onComplete={() => zoomToElement('middle', 4)}
    >
      <div
        className={'grid max-h-screen grid-cols-7 grid-rows-7 gap-0.5'}
        style={{ aspectRatio: planeAspectRatio.toString() }}
      >
        {gameMapArray.map((card, index) =>
          card ? (
            <Flipped
              flipId={card.name}
              key={card.name}
              onExit={animateElementOut}
              onAppear={animateElementIn}
              transformOrigin={'center'}
            >
              <MapTile
                card={card}
                index={index}
                zoomToElement={zoomToElement}
                resetTransform={resetTransform}
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
      {({ zoomToElement, resetTransform }) => (
        <TransformComponent>
          <div
            className={
              'background-animate flex h-screen w-screen items-center justify-center'
            }
          >
            <PlayingGrid
              gameMap={gameMap}
              zoomToElement={zoomToElement}
              resetTransform={resetTransform}
            />
            <div className={'absolute top-0 left-0 z-10 flex gap-0.5'}>
              <button
                className={'bg-red-700'}
                onClick={(event) => {
                  startGame();
                  event.currentTarget.remove();
                }}
              >
                START
              </button>
              <button
                className={'bg-green-600'}
                onClick={() => document.documentElement.requestFullscreen()}
              >
                FULLSCREEN
              </button>
              <button
                className={'bg-blue-400'}
                onClick={() => alert(INFO_TEXT)}
              >
                INFO
              </button>
            </div>
          </div>
          {/*not nice since now everything needs z index*/}
          <div
            className={'absolute h-screen w-screen'}
            onClick={() => {
              resetTransform();
            }}
          ></div>
        </TransformComponent>
      )}
    </TransformWrapper>
  );
}
