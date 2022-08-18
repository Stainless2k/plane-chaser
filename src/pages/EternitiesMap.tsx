import React from 'react';
import all_planes from '../data/all_planes.json';
import _ from 'lodash';
import { GoodCard } from '../logic/types';

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
    ></div>
  );
}
