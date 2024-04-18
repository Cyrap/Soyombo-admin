'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
} from 'react-share';

interface ShareProps{
  header: string | undefined
}

export function Share({header}:ShareProps) {
  const path = usePathname();
  console.log(path)
  const shareUrl = `https://soyombo-admin.vercel.app${path}`;
  return (
      <div>
        <FacebookShareButton url={shareUrl} title={header} className="Demo__some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
  );
}

export default Share;