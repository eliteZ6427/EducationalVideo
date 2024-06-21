import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

interface HeaderProps {
    onLogoClick: () => void;
    setShowModal: () => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, setShowModal, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    return (
        <div className='w-full p-4'>
            <div className='flex flex-col md:grid md:grid-cols-3 md:h-[49px] w-full'>
                <div className='w-full bg-gray-300 flex items-center rounded-full px-3 mb-4 md:mb-0 order-2 md:order-1'>
                    <FontAwesomeIcon icon={faSearch} className='w-[17.58px] h-[17.58px]' />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Search videos'
                        className='bg-transparent outline-none w-full m-[10px]'
                    />
                </div>
                <div className='flex justify-center items-center mb-4 md:mb-0 order-1 md:order-2' onClick={onLogoClick}>
                    <Image src='/LOGO_ICON.png' alt="dashboard" width={43} height={43} className='h-[43px]' />
                    <p className="p-2 text-green-400 text-3xl font-bold">Learnwell</p>
                </div>
                <div className='flex justify-end order-3 md:order-3 w-full'>
                    <button className='w-full md:w-auto h-full bg-[#00B6EF] rounded-full text-white text-lg cursor-pointer' onClick={() => setShowModal()}>
                        <p className='p-2 px-6'>Upload</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;