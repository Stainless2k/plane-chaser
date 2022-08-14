import { useState } from 'react';
import _ from 'lodash';
import { Card, ImageUris } from 'scryfall-api';
import { useQuery } from '@tanstack/react-query';
import all_planes from '../data/all_planes.json';

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
    <div className={'h-full w-full'}>
      <img
        style={{
          width: `${planeAspectRatio90degRot * 100}%`,
        }}
        className={'relative left-full origin-top-left rotate-90 object-fill'}
        src={src}
        alt={'planes'}
        width={670}
        height={974}
      />
    </div>
  );
}

function PlaneCard({
  error,
  data,
}: {
  error: string | undefined;
  data: string | undefined;
}) {
  let content = (
    <div className={'m-auto h-fit w-fit animate-[ping_2s_ease-out_infinite]'}>
      Walking...
    </div>
  );
  if (error) return <div>An error has occurred: + {error}</div>;
  if (data) content = <RotatedCard90Deg src={data} />;
  return (
    <div
      className={'flex'}
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
  const [deck, setDeck] = useState<GoodCard[]>(cards);
  const [field, setField] = useState<GoodCard[]>([]);
  const topCard = _.head(field);

  const { error, data, isLoading } = useFetchCardPicture(topCard);

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

  return (
    <>
      <button
        className={'w-full bg-gradient-to-r from-sky-300 to-indigo-600'}
        onClick={() => {
          if (deck.length < 1) reset();
          else walk();
        }}
        disabled={isLoading}
      >
        {deck.length < 1 ? 'shuffle' : isLoading ? 'wait' : 'walk'}
      </button>
      {topCard ? (
        <PlaneCard error={error?.message} data={data} />
      ) : (
        <div>No cards :(</div>
      )}
    </>
  );
}
