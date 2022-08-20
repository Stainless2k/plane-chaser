import create from 'zustand';
import { CARDINAL_DIRECTIONS, Grid } from '../logic/Grid';
import { GoodCard } from '../logic/types';
import { HELLRIDE_DIRECTIONS, startGame, walk } from '../logic/GameActions';
import all_planes from '../data/all_planes.json';

interface EternitesMapStore {
  deck: GoodCard[];
  gameMap: Grid<GoodCard>;
  walk: (direction: CARDINAL_DIRECTIONS) => void;
  hellRide: (direction: HELLRIDE_DIRECTIONS) => void;
  startGame: () => void;
}

export const planes: GoodCard[] = all_planes.cards.map(
  ({ name, image_uris: { border_crop } }) => ({
    name,
    image_uris: { border_crop },
  })
);

export const useGameStore = create<EternitesMapStore>()((set) => ({
  deck: planes.slice(1),
  gameMap: new Grid<GoodCard>(7, 7).set(3, 3, planes[0]),
  walk: (direction) => set((state) => walk(direction, state)),
  hellRide: (direction) => {
    throw Error('not implemented');
  },
  startGame: () => set((state) => startGame(state)),
}));
