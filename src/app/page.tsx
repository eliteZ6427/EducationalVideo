"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import UploadModal from "@/components/UploadModal";
import { VideoProps } from "@/lib/interface";
import Gallery from "@/components/Gallery";
import ShowRoom from "@/components/ShowRoom";


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [filteredVideos, setFilteredVideos] = useState<any[]>(videos);

  const closeModal = () => {
    setShowModal(false);
    loadVideos(process.env.NEXT_PUBLIC_USER_ID);
  };

  const loadVideos = async (userId: string) => {
    try {
      const response = await fetch(`/api/getUserVideos?user_id=${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user videos');
      }

      const data = await response.json();
      setVideos(data.videos);
      setFilteredVideos(data.videos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };
  useEffect(() => {
    loadVideos(process.env.NEXT_PUBLIC_USER_ID);
  }, []);

  const handleVideoClick = (id: string) => {
    setSelectedVideo(filteredVideos.find(video => video.id === id));
  };

  const handleLogoClick = () => {
    setSelectedVideo(null);
  }

  const handleSearch = (query: string) => {
    const filtered = videos.filter(video => video.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredVideos(filtered);
    if (selectedVideo && filtered) {
      setSelectedVideo(null);
      setTimeout(() => {
        setSelectedVideo(filtered[0]);
      }, 100);
    }
  }

  return (
    <>
      <Header setShowModal={() => setShowModal(!showModal)} onLogoClick={() => handleLogoClick()} onSearch={handleSearch} />
      <div className="mt-8 w-full">
        {selectedVideo ? (
          <ShowRoom
            selectedVideo={selectedVideo}
            otherVideos={filteredVideos.filter(video => video !== selectedVideo)}
            onVideoClick={handleVideoClick}
          />
        ) : (
          <Gallery videos={filteredVideos} onVideoClick={handleVideoClick} />
        )}
      </div>
      {showModal && <UploadModal isOpen={showModal} onClose={closeModal} />}
    </>
  );
}
