import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <div className={'flex flex-col gap-0.5'}>
      <Link href="/PlaneChase">PlaneChase</Link>
      <Link href="/EternitiesMap">EternitiesMap</Link>
    </div>
  );
}
