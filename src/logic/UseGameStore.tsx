import create from 'zustand';
import { CARDINAL_DIRECTIONS, Grid } from './Grid';
import { GoodCard } from './types';
import { startGame, walk } from './GameActions';
import all_planes from '../data/all_planes.json';
import { shuffle } from 'lodash';

interface EternitesMapStore {
  deck: GoodCard[];
  gameMap: Grid<GoodCard>;
  walk: (direction: CARDINAL_DIRECTIONS) => void;
  // hellRide: (direction: HELLRIDE_DIRECTIONS) => void;
  startGame: () => void;
}

export const planes: GoodCard[] = shuffle(
  all_planes.cards.map(({ name, image_uris: { border_crop } }) => ({
    name,
    image_uris: { border_crop },
  }))
);

export const useGameStore = create<EternitesMapStore>()((set) => ({
  deck: planes.slice(1),
  gameMap: new Grid<GoodCard>(7, 7).set(3, 3, planes[0]),
  walk: (direction) => set((state) => walk(direction, state)),
  // hellRide: () => {
  //   throw Error('not implemented');
  // },
  startGame: () => set((state) => startGame(state)),
}));
