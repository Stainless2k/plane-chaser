import { useState } from 'react';
import _ from 'lodash';
import { Card, ImageUris } from 'scryfall-api';
import { useQuery } from '@tanstack/react-query';
import all_planes from '../data/all_planes.json';
import Image from 'next/future/image';

type GoodCard = Pick<Card, 'name'> & {
  image_uris: Pick<ImageUris, 'border_crop'>;
};

const planeAspectRatio = 974 / 670;
const planeAspectRatio90degRot = 670 / 974;

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

function RotatedCard90Deg({ src }: { src: string }) {
  return (
    <div className={'h-full w-full overflow-hidden'}>
      <Image
        style={{
          width: `${planeAspectRatio90degRot * 100}%`,
        }}
        className={
          'relative inset-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 object-fill'
        }
        src={src}
        width={670}
        height={974}
        unoptimized
      />
    </div>
  );
}

function PlaneCardRot90Deg({
  error,
  data,
}: {
  error: string | undefined;
  data: string | undefined;
}) {
  let content = (
    <div
      className={
        'relative inset-y-1/2 m-auto h-fit w-fit origin-center -translate-y-1/2 animate-[ping_2s_ease-out_infinite]'
      }
    >
      Walking...
    </div>
  );
  if (error) return <div>An error has occurred: + {error}</div>;
  if (data)
    content = (
      <div key={data} className={'animate-pop h-full w-full'}>
        <RotatedCard90Deg src={data} />
      </div>
    );
  return (
    <div
      className={
        'relative inset-y-1/2 m-auto max-h-screen -translate-y-1/2 text-clip'
      }
      style={{ aspectRatio: planeAspectRatio.toString() }}
    >
      {content}
    </div>
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
        'background-animate h-screen w-screen bg-gradient-to-r from-pink-800 via-violet-600 to-sky-900'
      }
      onClick={() => onClick()}
    >
      <PlaneCardRot90Deg error={error?.message} data={data} />
    </div>
  );
}
