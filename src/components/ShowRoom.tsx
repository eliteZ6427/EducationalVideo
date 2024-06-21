import React, { useEffect, useState } from 'react';
import Video from './Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { ShowRoomProps, VideoProps, CommentProps } from '@/lib/interface';
import { timeSince } from '@/lib/utils';

const ShowRoom: React.FC<ShowRoomProps> = ({ selectedVideo, otherVideos, onVideoClick }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoProps>(selectedVideo);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  const loadComments = async (videoId: string) => {
    try {
      const response = await fetch(`/api/getComments?video_id=${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data.comments);
      setCurrentVideo(prevVideo => ({ ...prevVideo, num_comments: data.comments.length }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    loadComments(currentVideo.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo.id]);

  const handleAddComment = async () => {
    if (comment.trim() === '') return;

    const newComment = {
      video_id: currentVideo.id,
      content: comment,
      user_id: process.env.NEXT_PUBLIC_USER_ID
    };

    try {
      const response = await fetch(`/api/putComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      setComment('');
      await loadComments(currentVideo.id); // Fetch comments again to include the new comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleVideoClick = (video: VideoProps) => {
    onVideoClick(video.id);
    setCurrentVideo(video);
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-2/3 w-full">
        <video key={currentVideo.video_url} controls className="w-full h-auto rounded-3xl">
          <source src={currentVideo.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="mt-2 text-2xl font-bold">{currentVideo.title}</p>
        <p className="mt-2 font-bold">{currentVideo.user_id} • {timeSince(currentVideo.created_at)}</p>
        <p className="mt-2">
          <FontAwesomeIcon icon={faMessage} />&nbsp;
          {currentVideo.num_comments} comments
        </p>

        {/* Comment Editor */}
        <div className="mt-4 flex items-center">
          <div className="w-full bg-gray-300 flex items-center rounded-full px-3">
            <FontAwesomeIcon icon={faPlusSquare} className="w-[21px] h-[21px]" />
            <textarea
              className="bg-transparent outline-none w-full m-[10px] resize-none"
              rows={3}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            className="m-4 px-4 py-2 bg-blue-500 text-white text-lg rounded-full"
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        {/* Comment List */}
        <div className="m-4">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-2">
              <div className="flex items-center">
                <p className="font-bold px-2">{comment.user_id}</p>•
                <p className="text-sm text-gray-500 px-2">{timeSince(comment.created_at)}</p>
              </div>
              <div className="w-fit bg-gray-200 m-2 rounded-r-3xl rounded-bl-3xl">
                <p className="p-4">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:w-1/3 w-full mt-4 md:mt-0 md:pl-4">
        {otherVideos.map((video: VideoProps) => (
          <Video key={video.id} {...video} onClick={() => handleVideoClick(video)} />
        ))}
      </div>
    </div>
  );
};

export default ShowRoom;
