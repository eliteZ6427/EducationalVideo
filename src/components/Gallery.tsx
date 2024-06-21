import React from 'react';
import Video from './Video';
import { GalleryProps } from '@/lib/interface';

const Gallery: React.FC<GalleryProps> = ({ videos, onVideoClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video, index) => (
        <Video key={video.id} {...video} onClick={() => onVideoClick(video.id)} />
      ))}
    </div>
  );
};

export default Gallery;
