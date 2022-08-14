import { useState } from 'react';
import _ from 'lodash';
import { Card, ImageUris } from 'scryfall-api';
import { useQuery } from '@tanstack/react-query';
import all_planes from '../data/all_planes.json';
import { PlaneCard } from '../comp/PlaneCard';

type GoodCard = Pick<Card, 'name'> & {
  image_uris: Pick<ImageUris, 'border_crop'>;
};

function splitFirst<T>(array: T[]): [T, T[]] {
  const head = _.head(array);
  if (head === undefined)
    throw Error('Trying to split array of length 0: ' + array.toString());
  return [head, _.tail(array)];
}

function useFetchCardPicture(card: GoodCard | undefined) {
  return useQuery<string, Error>([card?.name], () =>
    fetch(card?.image_uris.border_crop ?? '').then(async (res) =>
      URL.createObjectURL(await res.blob())
    )
  );
}

export async function getStaticProps() {
  const planes: GoodCard[] = _.shuffle(all_planes.cards).map(
    ({ name, image_uris: { border_crop } }) => ({
      name,
      image_uris: { border_crop },
    })
  );
  return {
    props: { cards: planes }, // will be passed to the page component as props
  };
}

export default function App({ cards }: { cards: GoodCard[] }) {
  const [initField, initDeck] = splitFirst(cards);
  const [deck, setDeck] = useState<GoodCard[]>([initField]);
  const [field, setField] = useState<GoodCard[]>(initDeck);
  const topCard = _.head(field);

  const { error, data } = useFetchCardPicture(topCard);

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

  function onClick() {
    if (deck.length < 1) reset();
    else walk();
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
