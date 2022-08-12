import { useEffect, useState } from 'react';
import _ from 'lodash';
import all_planes from '../data/all_planes.json';
import { Card } from 'scryfall-api';
import Image from 'next/image';

type GoodCard = Omit<Card, 'prices'>;

const planes = _.shuffle(all_planes.cards) as GoodCard[];

function splitFirst<T>(array: T[]): [T, T[]] {
  const head = _.head(array);
  if (head === undefined)
    throw Error('Trying to split array of length 0: ' + array.toString());

  return [head, _.tail(array)];
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
      {topCard && (
        <Image
          className={'rotate-90'}
          src={topCard.image_uris!.border_crop}
          alt={'planes'}
          layout="responsive"
          width={'100%'}
          height={'100%'}
          objectFit="contain"
          unoptimized
        />
      )}
    </>
  );
}
