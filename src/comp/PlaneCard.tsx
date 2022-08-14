import Image from 'next/future/image';

const planeAspectRatio = 670 / 974;

function RotatedCard({ src }: { src: string }) {
  return (
    <div className={'h-full w-full overflow-hidden'}>
      <Image src={src} width={670} height={974} unoptimized />
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
      <div key={data} className={'animate-pop h-full w-full'}>
        <RotatedCard src={data} />
      </div>
    );
  return (
    <div
      className={'max-h-screen'}
      style={{ aspectRatio: planeAspectRatio.toString() }}
    >
      {content}
    </div>
  );
}
