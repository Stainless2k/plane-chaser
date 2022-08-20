import React from 'react';
import all_planes from '../data/all_planes.json';
import _ from 'lodash';
import { GoodCard } from '../logic/types';
import { CARDINAL_DIRECTIONS, Grid } from '../logic/Grid';
import { HELLRIDE_DIRECTIONS } from '../logic/GameActions';

const FIELDSIZE_X = 7;
const FIELDSIZE_Y = 7;

interface EternitesMapStore {
  deck: GoodCard[];
  map: Grid<GoodCard>;
  walk: (direction: CARDINAL_DIRECTIONS) => void;
  hellRide: (direction: HELLRIDE_DIRECTIONS) => void;
  startGame: () => void;
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

export default function EternitiesMap({ cards }: { cards: GoodCard[] }) {
  return (
    <div
      className={
        'background-animate flex h-screen w-screen items-center justify-center'
      }
    >
      <div className={'grid h-full w-full grid-cols-7 grid-rows-7 gap-0.5'}>
        {[...Array(7 * 7).keys()].map((_, index) => (
          <div className={'border-2 border-red-700 text-center'} key={index}>
            {index}
          </div>
        ))}
      </div>
    </div>
  );
}
