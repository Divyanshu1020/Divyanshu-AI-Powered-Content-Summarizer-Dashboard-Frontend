import React from 'react';
import { FaHistory } from "react-icons/fa";
import { Button } from './ui/button';

export default function Navbar({ logout }) {
    return (
        <nav className=' py-4  '>
            <div className=' mx-auto flex flex-row justify-between items-center'>
                <a href="#" className=' text-xl font-bold flex flex-row '>
                    AI Summarizer
                </a>
                <div className='flex flex-row items-center gap-7'>
                    <FaHistory size={20} className=' cursor-pointer' />
                    <Button onClick={() => logout()}>Logout</Button>
                </div>
            </div>
        </nav>
    )
}
