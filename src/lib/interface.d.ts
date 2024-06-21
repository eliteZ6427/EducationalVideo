export interface VideoProps {
    id: string;
    title: string;
    description: string;
    video_url: string;
    created_at: string;
    user_id: string;
    num_comments: number;
    onClick: () => void;
}

export interface GalleryProps {
    videos: VideoProps[];
    onVideoClick: (id: string) => void;
}

export interface ShowRoomProps {
    selectedVideo: VideoProps;
    otherVideos: VideoProps[];
    onVideoClick: (id: string) => void;
}

export interface CommentProps {
    id: string,
    video_id: string,
    user_id: string,
    content: string,
    created_at: string
}