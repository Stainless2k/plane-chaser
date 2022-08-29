import Image from 'next/future/image';

export const planeAspectRatio = 670 / 974;

function RotatedCard({ src }: { src: string }) {
  return (
    <div
      className={
        'pointer-events-none h-full w-full select-none overflow-hidden'
      }
    >
      <Image
        className={'pointer-events-none select-none'}
        src={src}
        width={670}
        height={974}
        unoptimized
      />
    </div>
  );
}

export function PlaneCard({
  error,
  data,
}: {
  error: string | undefined;
  data: string | undefined;
}) {
  let content = (
    <div
      style={{ writingMode: 'vertical-lr' }}
      className={'h-fit w-fit animate-[ping_2s_ease-out_infinite]'}
    >
      <div className={'animate-fade -translate-x-1/2 rotate-180'}>
        Walking...
      </div>
    </div>
  );
  if (error) return <div>An error has occurred: + {error}</div>;
  if (data)
    content = (
      <div className={'h-full w-full'}>
        <RotatedCard src={data} />
      </div>
    );
  return (
    <div style={{ aspectRatio: planeAspectRatio.toString() }}>{content}</div>
  );
}
