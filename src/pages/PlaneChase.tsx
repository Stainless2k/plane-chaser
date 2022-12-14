import { useReducer } from 'react';
import _ from 'lodash';
import all_planes from '../data/all_planes.json';
import { PlaneCard } from '../comp/PlaneCard';
import { GoodCard } from '../logic/types';
import { useFetchCardPicture } from '../logic/useFetchCardPicture';

type Action = { type: 'walk' } | { type: 'reset' };
type GameState = { field: GoodCard[]; deck: GoodCard[] };

function splitFirst<T>(array: T[]): [T, T[]] {
  const head = _.head(array);
  if (head === undefined)
    throw Error('Trying to split array of length 0: ' + array.toString());
  return [head, _.tail(array)];
}

function reset({ deck, field }: GameState): GameState {
  const [topField, restField] = splitFirst(field);
  return {
    field: [topField],
    deck: _.shuffle([...deck, ...restField]),
  };
}

function walk(gameState: GameState): GameState {
  let currentState: GameState = gameState;

  if (currentState.deck.length < 1) {
    currentState = reset(currentState);
  }
  const [drawnCard, restDeck] = splitFirst(currentState.deck);

  return {
    field: [drawnCard, ...currentState.field],
    deck: restDeck,
  };
}

function gameLogic(gameState: GameState, action: Action): GameState {
  switch (action.type) {
    case 'walk': {
      return walk(gameState);
    }
    case 'reset': {
      return reset(gameState);
    }
  }
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

export default function PlaneChase({ cards }: { cards: GoodCard[] }) {
  const [initField, initDeck] = splitFirst(cards);
  const [{ field }, dispatch] = useReducer(gameLogic, {
    field: [initField],
    deck: initDeck,
  });

  const topCard = _.head(field);

  const { error, data } = useFetchCardPicture(topCard);

  function onClick() {
    dispatch({ type: 'walk' });
  }

  return (
    <div
      className={
        'background-animate flex h-screen w-screen items-center justify-center'
      }
      onClick={() => onClick()}
    >
      <PlaneCard error={error?.message} data={data} />
    </div>
  );
}
