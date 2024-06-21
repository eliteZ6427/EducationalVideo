import React from 'react'
import Image from 'next/image'
import { VideoProps } from '@/lib/interface';
import { timeSince } from '@/lib/utils';
import { FiMessageSquare } from "react-icons/fi";


const Video: React.FC<VideoProps> = ({ title, user_id, video_url, created_at, num_comments, onClick }) => {
    return (
        <div>
            <div onClick={onClick}>
                <video className="w-full h-auto rounded-3xl">
                    <source src={video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {/* title */}
            <p className='text-xl'>{title}</p>
            {/* auther */}
            <div className='flex justify-first items-center text-4'>
                <Image src='/auther-icon.svg' width={20} height={20} alt='' />
                <p className='ml-[6px]'>{user_id}</p>
                <p className='ml-[6px]'>•</p>
                <p className='ml-[6px]'>{timeSince(created_at)}</p>
            </div>
            {/* comments */}
            <div className='flex justify-first items-center mt-3'>
                <FiMessageSquare />
                <p className='ml-[6px]'>{num_comments} comments</p>
            </div>
        </div>
    )
}

export default Video