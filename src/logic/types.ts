import { Card, ImageUris } from 'scryfall-api';

export type GoodCard = Pick<Card, 'name'> & {
  image_uris: Pick<ImageUris, 'border_crop'>;
};
