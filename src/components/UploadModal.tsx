"use Client";
import { faLink, faMessage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';

interface UploadModalProps {
    isOpen: boolean,
    onClose: () => void
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [isOpenState, setIsOpenState] = useState(isOpen);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleClose = () => {
        setIsOpenState(false);
        onClose();
    };

    const handleUpload = async () => {
        if (!title || !description || !videoUrl) {
            setError('All fields are required.');
            return;
        }

        const newVideo = {
            user_id: "1",
            description: description,
            video_url: videoUrl,
            title: title
        };

        try {
            const response = await fetch(`/api/createVideo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newVideo),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            setVideoUrl('');
            setDescription('');
            setTitle('');
            handleClose();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    React.useEffect(() => {
        setIsOpenState(isOpen);
    }, [isOpen]);
    return (
        <div className='flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-gray-800 bg-opacity-75' onClick={handleClose}>
            <div className='w-[480px] h-fit p-8 bg-white rounded-2xl' onClick={(e) => e.stopPropagation()}>
                <p className='text-[32px]'>Upload a video</p>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='w-full bg-gray-300 flex items-center rounded-full px-3 mt-8'>
                    <FontAwesomeIcon icon={faVideo} className='w-[17.58px] h-[17.58px]' />
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder='Title your video'
                        className='bg-transparent outline-none w-full m-[10px]'
                    />
                </div>
                <div className='w-full bg-gray-300 flex items-center rounded-full px-3 mt-8'>
                    <FontAwesomeIcon icon={faMessage} className='w-[17.58px] h-[17.58px]' />
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        required
                        placeholder='Type your video description'
                        className='bg-transparent outline-none w-full m-[10px]'
                    />
                </div>
                <div className='w-full bg-gray-300 flex items-center rounded-full px-3 mt-8'>
                    <FontAwesomeIcon icon={faLink} className='w-[17.58px] h-[17.58px]' />
                    <input
                        type='text'
                        value={videoUrl}
                        onChange={(e) => { setVideoUrl(e.target.value) }}
                        required
                        placeholder='Your video url'
                        className='bg-transparent outline-none w-full m-[10px]'
                    />
                </div>
                <div className='flex justify-end mt-8'>
                    <button className='text-[20px] rounded-full w-[116px] h-[49px] bg-gray-300' onClick={handleClose}>Cancel</button>
                    <button className='text-white text-[20px] rounded-full w-[116px] h-[49px] bg-[#00B6EF] ml-4' onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadModal