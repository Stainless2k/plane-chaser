import { GoodCard } from './types';
import { useQuery } from '@tanstack/react-query';

//fetch card pictures from scryfall, mainly used to show loading state
export function useFetchCardPicture(card: GoodCard | undefined) {
  return useQuery<string, Error>([card?.name], () =>
    fetch('https://corsproxy.io/?' + card?.image_uris.border_crop).then(
      async (res) => URL.createObjectURL(await res.blob())
    )
  );
}
