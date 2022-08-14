import Image from 'next/future/image';

const planeAspectRatio = 974 / 670;
const planeAspectRatio90degRot = 670 / 974;

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

export function PlaneCardRot90Deg({
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
      <div key={data} className={'animate-pop-90deg h-full w-full'}>
        <RotatedCard90Deg src={data} />
      </div>
    );
  return (
    <div
      className={'relative inset-y-1/2 m-auto max-h-screen -translate-y-1/2'}
      style={{ aspectRatio: planeAspectRatio.toString() }}
    >
      {content}
    </div>
  );
}
