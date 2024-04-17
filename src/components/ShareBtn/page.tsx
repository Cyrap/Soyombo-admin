'use client'
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
} from 'react-share';


export function Share() {
  const shareUrl = 'https://online-car-shop.vercel.app/';
  const title = 'Soyombo';

  return (
      <div>
        <FacebookShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
  );
}

export default Share;