import { useEffect, useState } from 'react';
import _ from 'lodash';
import all_planes from '../data/all_planes.json';
import { Card } from 'scryfall-api';
import { SetRequired } from 'type-fest';
import { useQuery } from '@tanstack/react-query';

type GoodCard = SetRequired<Omit<Card, 'prices'>, 'image_uris'>;

const planes = _.shuffle(all_planes.cards) as GoodCard[];
const planeAspectRatio = 974 / 670;
const planeAspectRatio90degRot = 670 / 974;

function splitFirst<T>(array: T[]): [T, T[]] {
  const head = _.head(array);
  if (head === undefined)
    throw Error('Trying to split array of length 0: ' + array.toString());
  return [head, _.tail(array)];
}

function PlaneCard({ card }: { card: GoodCard }) {
  const { isLoading, error, data } = useQuery([card.name], () =>
    fetch(card?.image_uris.border_crop).then(async (res) =>
      URL.createObjectURL(await res.blob())
    )
  );

  if (isLoading) return <div>Walking...</div>;

  if (error) return <div>An error has occurred: + {error.message}</div>;

  return (
    <div
      className={'overflow-hidden'}
      style={{ aspectRatio: planeAspectRatio.toString() }}
    >
      <img
        style={{
          aspectRatio: planeAspectRatio90degRot.toString(),
          width: `${planeAspectRatio90degRot * 100}%`,
        }}
        className={'relative left-full origin-top-left rotate-90 object-fill'}
        src={data}
        alt={'planes'}
        width={670}
        height={974}
      />
    </div>
  );
}

export default function App() {
  const [deck, setDeck] = useState<GoodCard[]>([]);
  const [field, setField] = useState<GoodCard[]>([]);

  useEffect(() => {
    setDeck(planes);
  }, []);

  function reset() {
    const [newFiled, newDeck] = splitFirst(field);
    setDeck(_.shuffle(newDeck));
    setField([newFiled]);
  }

  function draw() {
    const [card, rest] = splitFirst(deck);
    setDeck(rest);
    return card;
  }

  function walk() {
    const drawnCard = draw();
    setField((prevState) => [drawnCard, ...prevState]);
  }

  const topCard = _.head(field);

  return (
    <>
      <div>deck: {deck.length}</div>
      <div>field: {field.length}</div>
      <button
        onClick={() => {
          if (deck.length < 1) reset();
          else walk();
        }}
      >
        {deck.length < 1 ? 'shuffle' : 'walk'}
      </button>
      {topCard ? <PlaneCard card={topCard} /> : <div>No cards :(</div>}
    </>
  );
}
